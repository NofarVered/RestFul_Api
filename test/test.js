const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

chai.should();
chai.use(chaiHttp);

describe("Authentication", () => {
  it("Authentication - missing a year", (done) => {
    chai
      .request(server)
      .get("/api/surprise?name=Nofar")
      .end((err, response) => {
        response.should.have.status(400);
      });
    done();
  });

  it("Authentication- birth year is 34", (done) => {
    chai
      .request(server)
      .get("/api/surprise?name=Nofar&birth_year=34")
      .end((err, response) => {
        response.should.have.status(400);
      });
    done();
  });

  it("Authentication- name is a number", (done) => {
    chai
      .request(server)
      .get("/api/surprise?name=1e2a&birth_year=34")
      .end((err, response) => {
        response.should.have.status(400);
      });
    done();
  });
  it("Authentication- no params at all", (done) => {
    chai
      .request(server)
      .get("/api/surprise?")
      .end((err, response) => {
        response.should.have.status(400);
      });
    done();
  });
});
describe("API Suprise", () => {
  it("name sum- without space + capital letters", async () => {
    chai
      .request(server)
      .get("/api/surprise?name=AAA&birth_year=2009")
      .end((err, response) => {
        response.should.have.status(200);
        chai.expect(response.body).to.be.deep.equal({
          type: "name-sum",
          result: 3,
        });
      });
  });

  it("name sum- with space + capital letters", async () => {
    chai
      .request(server)
      .get("/api/surprise?name=AA%20A&birth_year=2009")
      .end((err, response) => {
        response.should.have.status(200);
        chai.expect(response.body).to.be.deep.equal({
          type: "name-sum",
          result: 3,
        });
      });
  });

  it("name sum- with space + mixed letters", async () => {
    chai
      .request(server)
      .get("/api/surprise?name=Aa%20a&birth_year=2001")
      .end((err, response) => {
        response.should.have.status(200);
        chai.expect(response.body).to.be.deep.equal({
          type: "name-sum",
          result: 3,
        });
      });
  });

  it("chuck noris joke", async () => {
    chai
      .request(server)
      .get("/api/surprise?name=Qyan%20Gosling&birth_year=1980")
      .end((err, response) => {
        response.should.have.status(200);
        chai.expect(response.body.type).to.be.deep.equal("chuck-norris-joke");
      });
  });

  it("kayne quote", async () => {
    chai
      .request(server)
      .get("/api/surprise?name=Qyan%20Gosling&birth_year=2009")
      .end((err, response) => {
        response.should.have.status(200);
        chai.expect(response.body.type).to.be.deep.equal("kanye-quote");
      });
  });
});
describe("API stats", () => {
  it("stats - requests+distribution", async () => {
    chai
      .request(server)
      .get("/api/stats")
      .end((err, response) => {
        response.should.have.status(200);
        chai.expect(response.body).to.be.deep.equal({
          requests: 5,
          distribution: [
            {
              type: "chuck-norris-joke",
              count: 1,
            },
            {
              type: "kanye-quote",
              count: 1,
            },
            {
              type: "name-sum",
              count: 3,
            },
            {
              type: "panda-facts",
              count: 0,
            },
          ],
        });
      });
  });
});
