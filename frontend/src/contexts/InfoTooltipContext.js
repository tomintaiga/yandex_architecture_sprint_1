
import { createRegisteredContext } from 'react-singleton-context';

// Create the React.Context with createRegisteredContext instead of React.createContext
export const InfoTooltipContext = createRegisteredContext(
    'InfoTooltipContext', // a sufficiently globally unique displayName
    false // default value
);

