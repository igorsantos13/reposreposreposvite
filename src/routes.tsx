import { BrowserRouter, Routes as Rotas, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { Repos } from "./pages/Repos";

export function Routes() {
  return (
    <BrowserRouter>
      <Rotas>
        <Route path="/" element={<Main />} />
        <Route path="/repos/:repo" element={<Repos />} />
      </Rotas>
    </BrowserRouter>
  );
}
