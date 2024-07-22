
import { createRegisteredContext } from 'react-singleton-context';

// Create the React.Context with createRegisteredContext instead of React.createContext
export const CurrentUserContext = createRegisteredContext(
    'MyLibraryNameExampleContext', // a sufficiently globally unique displayName
    null // default value
);

