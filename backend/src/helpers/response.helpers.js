/**
 *   Use this Reponse Handler to send any express response.
 *   Usage: Response(res).status(503).error("Service is not available").send();
 */

class ReponseHandler {
    constructor(res) {
      if (!res) {
        throw Error(
          "Express Response object is required to initialize Response Handler"
        );
      }
  
      this.response = res;
      this.statusCode = 200; // default All GOOD
      this.textMessage = false;
      this.result = undefined;
      this.errorStatus = false;
      this.pagination = undefined;
    }
  
    status(code) {
      this.statusCode = code;
      return this;
    }
  
    body(data) {
      this.result = data;
      return this;
    }
  
    message(text) {
      this.textMessage = text;
      return this;
    }
  
    error(text) {
      this.textMessage = text;
      this.errorStatus = true;
      return this;
    }
  
    paginate(pageObj) {
      this.pagination = pageObj;
      return this;
    }
  
    send() {
      const obj = {
        error: this.errorStatus,
        message: `${this.textMessage}` ?? "",
        result: this.result ?? null,
        pagination: this.pagination,
      };
  
      return this.response.status(this.statusCode).send(obj);
    }
  }
  
  const Response = (res) => {
    return new ReponseHandler(res);
  };
  
  module.exports = Response;
  