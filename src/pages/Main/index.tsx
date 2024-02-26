import { Github, Plus, Loader, Trash2, Menu, Trash } from "lucide-react";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { api } from "../../services/api";

export function Main() {
  interface Data {
    name: string;
  }
  const [newRepo, setNewRepo] = useState("");
  const [repository, setRepository] = useState<object[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleInputValue(e: ChangeEvent<HTMLInputElement>) {
    setNewRepo(e.target.value);
  }

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      async function submit() {
        setIsLoading(true);
        try {
          const response = await api.get(`repos/${newRepo}`);
          const data: Data = {
            name: response.data.full_name,
          };

          setRepository([...repository, data]);
          setNewRepo("");
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }

      submit();
    },
    [newRepo, repository]
  );
  return (
    <div className="antialiased p-4 mt-12 items-start w-[700px] min-h-[150px] rounded-md flex flex-col bg-white">
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
          className="py-2 px-3 flex-1 focus-visible:none focus:none outline-none bg-slate-100 rounded-sm"
          value={newRepo}
          onChange={handleInputValue}
        />
        <button disabled={isLoading} type="submit">
          {isLoading ? (
            <Loader className="animate-spin" />
          ) : (
            <Plus className="" />
          )}
        </button>
      </form>

      <ul className="p-4 flex flex-col justify-between w-full">
        {repository?.map((repo) => (
          <div className="flex w-full justify-between pt-6 border-2 p-2 border-t-0 border-l-0 border-r-0 border-b-slate-600">
            <div className="flex flex-row jus items-center gap-2">
              <Trash2 className="cursor-pointer" />
              <li key={repo.name}>{repo.name}</li>
            </div>
            <Menu className="cursor-pointer" />
          </div>
        ))}
      </ul>
    </div>
  );
}
