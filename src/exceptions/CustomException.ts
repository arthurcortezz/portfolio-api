class CustomException extends Error {
  codigo: number;
  mensagem: any;

  constructor(message: any, codigo: number) {
    super(message);
    this.codigo = codigo ?? 500;
    this.mensagem = message ?? "Ocorreu um erro.";
  }
}

export default CustomException;
