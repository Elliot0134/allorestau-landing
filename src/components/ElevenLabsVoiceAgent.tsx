import { useState, useEffect } from 'react';
import { useConversation } from '@elevenlabs/react';
import { motion } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { BarVisualizer, type AgentState } from '@/components/ui/bar-visualizer';

interface ElevenLabsVoiceAgentProps {
  agentId: string;
  onConversationEnd?: () => void;
  className?: string;
}

const ElevenLabsVoiceAgent = ({
  agentId,
  onConversationEnd,
  className = ''
}: ElevenLabsVoiceAgentProps) => {
  const { theme } = useTheme();
  const [isCallActive, setIsCallActive] = useState(false);
  const [currentState, setCurrentState] = useState<AgentState>('listening');
  const [micPermission, setMicPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isMicActive, setIsMicActive] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log('✅ Connected to ElevenLabs');
      setCurrentState('listening');
      setErrorMessage('');
    },
    onDisconnect: () => {
      console.log('❌ Disconnected from ElevenLabs');
      setIsCallActive(false);
      setIsMicActive(false);
      setCurrentState('listening');
      if (onConversationEnd) {
        onConversationEnd();
      }
    },
    onError: (error) => {
      console.error('❌ ElevenLabs error:', error);
      setErrorMessage(`Erreur: ${error}`);
      setIsCallActive(false);
      setIsMicActive(false);
    },
    onMessage: (message) => {
      console.log('💬 Message received:', message);
    },
    onModeChange: ({ mode }) => {
      console.log('🔄 Mode changed to:', mode);
      // Map ElevenLabs modes to our AgentState
      switch (mode) {
        case 'speaking':
          setCurrentState('speaking');
          break;
        case 'listening':
          setCurrentState('listening');
          break;
        default:
          setCurrentState('listening');
      }
    },
  });

  // Handle starting the conversation
  const handleStartCall = async () => {
    try {
      setErrorMessage('');
      setCurrentState('initializing');

      // 1. Request microphone permission explicitly
      console.log('Requesting microphone permission...');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone permission granted');
        setMicPermission('granted');
        setIsMicActive(true);

        // Stop the test stream immediately
        stream.getTracks().forEach(track => track.stop());
      } catch (micError) {
        console.error('Microphone permission denied:', micError);
        setMicPermission('denied');
        setErrorMessage('❌ Accès au microphone refusé. Veuillez autoriser l\'accès au microphone dans les paramètres de votre navigateur.');
        setCurrentState('listening');
        return;
      }

      // 2. Start the ElevenLabs conversation
      setIsCallActive(true);
      setCurrentState('connecting');

      console.log('🚀 Starting ElevenLabs session with agent:', agentId);
      const conversationId = await conversation.startSession({
        agentId: agentId,
        connectionType: 'webrtc', // IMPORTANT: Specify connection type for audio
      });

      console.log('✅ Session started successfully! Conversation ID:', conversationId);
    } catch (error) {
      console.error('Failed to start conversation:', error);
      setIsCallActive(false);
      setCurrentState('listening');
      setIsMicActive(false);
      setErrorMessage(`❌ Erreur: ${error instanceof Error ? error.message : 'Impossible de démarrer la conversation'}`);
    }
  };

  // Handle ending the conversation
  const handleEndCall = async () => {
    try {
      await conversation.endSession();
      setIsCallActive(false);
      setCurrentState('listening');
      setIsMicActive(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Failed to end conversation:', error);
      setErrorMessage('❌ Erreur lors de la fin de l\'appel');
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (conversation.status === 'connected') {
        conversation.endSession();
      }
    };
  }, []);

  // Get theme colors
  const getThemeColor = () => {
    switch (theme) {
      case 'pizzeria':
        return '#cc1616';
      case 'snack':
        return '#cda404';
      case 'restaurant':
        return '#003049';
      default:
        return '#cc1616';
    }
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Voice Visualizer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <BarVisualizer
          state={isCallActive ? currentState : 'listening'}
          demo={!isCallActive} // Use demo mode when not in call
          mediaStream={conversation.isSpeaking ? undefined : null}
          barCount={20}
          minHeight={15}
          maxHeight={90}
          className="h-40 w-full rounded-2xl border-4 border-black shadow-[10px_10px_0_#000]"
          style={{
            backgroundColor: isCallActive ? getThemeColor() : '#fdefd5',
          }}
        />
      </motion.div>

      {/* Microphone Info Message */}
      {!isCallActive && micPermission === 'prompt' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            border: '3px solid #3b82f6',
            fontFamily: 'Outfit, sans-serif'
          }}
        >
          <p className="text-sm font-bold" style={{ color: '#1e40af' }}>
            🎤 Pour parler avec l'agent IA, vous devrez autoriser l'accès au microphone
          </p>
        </motion.div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl text-center"
          style={{
            backgroundColor: '#fee2e2',
            border: '3px solid #991b1b',
            fontFamily: 'Outfit, sans-serif'
          }}
        >
          <p className="text-base font-bold" style={{ color: '#991b1b' }}>
            {errorMessage}
          </p>
          {micPermission === 'denied' && (
            <p className="text-sm mt-2" style={{ color: '#7f1d1d' }}>
              Pour autoriser le microphone: Cliquez sur l'icône de cadenas 🔒 dans la barre d'adresse, puis autorisez le microphone.
            </p>
          )}
        </motion.div>
      )}

      {/* Call Status */}
      {isCallActive && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p
            className="text-lg font-bold uppercase tracking-wider"
            style={{
              fontFamily: 'Outfit, sans-serif',
              color: '#fdefd5'
            }}
          >
            {currentState === 'connecting' && '🔌 Connexion...'}
            {currentState === 'initializing' && '⚙️ Initialisation...'}
            {currentState === 'listening' && '👂 À l\'écoute...'}
            {currentState === 'speaking' && '🗣️ Agent en train de parler...'}
            {currentState === 'thinking' && '💭 Réflexion...'}
          </p>
          {isMicActive && micPermission === 'granted' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 mt-2"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: '#10b981' }}
              />
              <p className="text-sm font-medium" style={{ color: '#fdefd5' }}>
                Microphone actif
              </p>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-4 justify-center">
        {!isCallActive ? (
          <motion.button
            onClick={handleStartCall}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-6 rounded-2xl font-black text-xl transition-all flex items-center gap-3"
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fdefd5',
              border: '5px solid #000',
              boxShadow: '10px 10px 0 #000',
              fontFamily: 'Outfit, sans-serif',
              borderRadius: '10px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '14px 14px 0 #000';
              e.currentTarget.style.transform = 'translate(-4px, -4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '10px 10px 0 #000';
              e.currentTarget.style.transform = 'translate(0, 0)';
            }}
          >
            <Phone className="w-6 h-6" />
            DÉMARRER L'APPEL
          </motion.button>
        ) : (
          <motion.button
            onClick={handleEndCall}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-6 rounded-2xl font-black text-xl transition-all flex items-center gap-3"
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#fdefd5',
              border: '5px solid #000',
              boxShadow: '10px 10px 0 #000',
              fontFamily: 'Outfit, sans-serif',
              borderRadius: '10px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '14px 14px 0 #000';
              e.currentTarget.style.transform = 'translate(-4px, -4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '10px 10px 0 #000';
              e.currentTarget.style.transform = 'translate(0, 0)';
            }}
          >
            <PhoneOff className="w-6 h-6" />
            TERMINER L'APPEL
          </motion.button>
        )}

        {/* Mute/Unmute button when in call */}
        {isCallActive && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => {
              // Toggle mute - this would need to be implemented with the actual API
              console.log('Mute toggle');
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-6 rounded-2xl font-black text-xl transition-all"
            style={{
              background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
              color: '#fdefd5',
              border: '5px solid #000',
              boxShadow: '10px 10px 0 #000',
              fontFamily: 'Outfit, sans-serif',
              borderRadius: '10px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '14px 14px 0 #000';
              e.currentTarget.style.transform = 'translate(-4px, -4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '10px 10px 0 #000';
              e.currentTarget.style.transform = 'translate(0, 0)';
            }}
          >
            <Mic className="w-6 h-6" />
          </motion.button>
        )}
      </div>

      {/* Connection Status Debug Info (can be removed in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-gray-500 text-center space-y-1">
          <div>Status: {conversation.status || 'disconnected'}</div>
          <div>Agent: {agentId.slice(0, 30)}...</div>
          <div>Mic: {micPermission} | Active: {isMicActive ? 'Yes' : 'No'}</div>
          {conversation.isSpeaking !== undefined && (
            <div>Speaking: {conversation.isSpeaking ? 'Yes' : 'No'}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ElevenLabsVoiceAgent;
