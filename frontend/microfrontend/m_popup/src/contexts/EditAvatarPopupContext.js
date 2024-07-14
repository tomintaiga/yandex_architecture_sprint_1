
import { createRegisteredContext } from 'react-singleton-context';

// Create the React.Context with createRegisteredContext instead of React.createContext
export const EditAvatarPopupContext = createRegisteredContext(
    'EditAvatarPopupContext', // a sufficiently globally unique displayName
    false // default value
);

