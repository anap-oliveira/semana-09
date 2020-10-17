const livros = require("../model/livros.json");

const getAll = (req, res) => {
  console.log(req.url);
  res.status(200).send(livros);
};

const getById = (req, res) => {
  const id = req.params.id;

  res.status(200).send(livros.find((livros) => livros.id == id));
};


const postlivros = (req, res) => {
  
  console.log(req.body);

  const { id, nomeDoLivro, editora, autoria, lancamento, genero } = req.body;

  livros.push({

    id,
    nomeDoLivro,
    editora,
    autoria,
    lancamento,
    genero
  });

  fs.writeFile("./src/model/livros.json",JSON.stringify(livros),"utf8",function (err) {
      if (err) {
        return res.status(424).send({
          message: err,
        });
      }
      console.log("Arquivo atualizado com sucesso!");
    }
  );

  res.status(201).send(livros); // Erro 201 para uso do POST
};

const deleteLivros = (req,res) => {
    const id = req.params.id;
    const livroFiltrado = livros.find((livro) => livro.id == id);
    const index = livros.indexOf(livroFiltrado);
    livros.splice(index, 1);

    fs.writeFile(
      "./src/model/livros.json",
      JSON.stringify(livros),
      "utf8",
      function (err) {
        if (err) {
          return res.status(424).send({
            message: err,
          });
        }
        console.log("Livro excluido e arquivo atualizado com sucesso!");
      }
    );
  
    res.status(200).send(livros);
  };
  




module.exports = {
  getAll,
  getById,
  postlivros,
  deleteLivros,
};

//