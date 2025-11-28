import { useEffect } from 'react';

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

const ElevenLabsWidget = () => {
  useEffect(() => {
    // Le script est chargé de manière asynchrone, on s'assure qu'il est bien chargé
    console.log('ElevenLabs ConvAI Widget initialized');
  }, []);

  return (
    <elevenlabs-convai
      agent-id="agent_6201kb2b1cqff8v9d5vxdk3rhc4g"
    />
  );
};

export default ElevenLabsWidget;
