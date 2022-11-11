import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";

const tratarErrors = (error: any[]) => {
  let erros: any[] = [];
  let mensagem = "Ocorreu um erro, tente novamente mais tarde.";
  if (error) {
    error.forEach(err => {
      erros.push({
        campo: err.path.replace("body.", "").replace("query.", ""),
        errors: err.errors,
        label: err.params.label,
        mensagem: `${err.params.label} ${err.errors[0]}`,
      });
    });
    mensagem = erros[0].mensagem;
  }
  return {
    erros,
    mensagem: mensagem,
  };
};

const validate =
  (schema: AnySchema) => async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.validate({ body: request.body }, { abortEarly: false });
      next();
    } catch (error: any) {
      const retorno = tratarErrors(error.inner);
      return response.status(400).json(retorno);
    }
  };

const validateQuery =
  (schema: AnySchema) => async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.validate({ query: request.query });
      next();
    } catch (error: any) {
      return response.status(400).json(error.params.label);
    }
  };

export { validate, validateQuery };
