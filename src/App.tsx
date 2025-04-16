import { useRoutes } from "react-router-dom";
import { routes } from "./route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        
          <AppRoutes />
       
      </QueryClientProvider>
    </div>
  );
}

export default App;
