import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

// Déclaration TypeScript pour le custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'agent-id': string;
        },
        HTMLElement
      >;
    }
  }
}

// Mapping des thèmes vers les agent IDs ElevenLabs
const AGENT_IDS = {
  pizzeria: 'agent_6201kb2b1cqff8v9d5vxdk3rhc4g', // TODO: Remplacer par l'agent ID Pizzeria
  snack: 'agent_7501kbdpg416fp5884x5k0p5fsvj',
  restaurant: 'agent_6101kbdvzgfcfshrmy90dbwewc4q',
} as const;

const ElevenLabsWidget = () => {
  const { theme } = useTheme();
  const agentId = AGENT_IDS[theme] || AGENT_IDS.snack;

  useEffect(() => {
    console.log(`ElevenLabs ConvAI Widget initialized with agent: ${agentId} (theme: ${theme})`);
  }, [agentId, theme]);

  return (
    <div className="fixed z-[999999]" style={{ pointerEvents: 'none' }}>
      <div style={{ pointerEvents: 'auto' }}>
        <elevenlabs-convai
          agent-id={agentId}
        />
      </div>
    </div>
  );
};

export default ElevenLabsWidget;
