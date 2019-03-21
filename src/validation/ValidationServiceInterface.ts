export default interface ValidationServiceInterface {
  validate(data: object, schema: object, messages: object);
}
