import { Github, Plus } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
export function Main() {
  const [newRepo, setNewRepo] = useState("");

  function handleInputValue(e: ChangeEvent<HTMLInputElement>) {
    setNewRepo(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }
  return (
    <div className="antialiased p-4 mt-12 items-start w-[700px] h-[150px] rounded-md flex flex-col bg-white">
      <div className="p-4 flex gap-2 w-full items-start">
        <Github size={25} />
        <h1 className="font-bold">Meus Repositórios</h1>
      </div>

      <form
        action=""
        className="p-4 flex items-center justify-center w-full gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Adicionar Repositorio"
          className="py-2 px-3 flex-1 focus-visible:none focus:none outline-none"
          value={newRepo}
          onChange={handleInputValue}
        />
        <button type="submit">
          <Plus />
        </button>
      </form>
    </div>
  );
}
