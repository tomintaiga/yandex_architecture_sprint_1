
import { createRegisteredContext } from 'react-singleton-context';

// Create the React.Context with createRegisteredContext instead of React.createContext
export const ImagePopupContext = createRegisteredContext(
    'ImagePopupContext', // a sufficiently globally unique displayName
    false // default value
);

