import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { RouterProvider } from "react-router-dom";
import router from './router/index.jsx';


const client = new ApolloClient({
    uri: "http://localhost:5081/graphql/",
    cache: new InMemoryCache(),
    headers: {
        authorization: localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')}` : "",
      },
});

export default function App() {
    return (
        <ApolloProvider client={client}>
            <RouterProvider router={router} />
        </ApolloProvider>
    )
}