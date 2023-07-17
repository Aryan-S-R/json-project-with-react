import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Content.css";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Row,
  Table,
} from "react-bootstrap";
import Api from "./api/Api";
import { FcOk } from "react-icons/fc";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { ThreeDots } from "react-loader-spinner";

const Content = () => {
  const [details, setDetails] = useState({});
  const [list, setlist] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.get("/details");
        setlist(response.data);
        setLoader(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    setTimeout(() => fetchData(), 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: details.name,
      password: details.password,
      email: details.email,
    };
    try {
      const response = await Api.post("/details", data);
      setlist([...list, response.data]);
    } catch (err) {
      console.log(err.message);
    }
    setDetails({});
  };

  const handleDelete = (id) => {
    const newList = list.filter((li) => li.id !== id);
    setlist(newList);
    console.log();
  };
  const handleEdit = (e) => {};

  return (
    <Container>
      {loader ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="red"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        <Row>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={details.name || ""}
                  onChange={(e) => handleChange(e)}
                />
                <Form.Label>E-mail id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your e-mail id"
                  name="email"
                  value={details.email || ""}
                  onChange={(e) => handleChange(e)}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="number"
                  required
                  placeholder="Enter your password"
                  name="password"
                  value={details.password || ""}
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
              <Button type="submit">
                <FcOk />
              </Button>
            </Form>
          </Col>
          <Col md={6}>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>e-mail</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {list.map((data) => (
                  <tr key={data.id}>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.password}</td>
                    <td>
                      <Button
                        type="button"
                        className="edit"
                        onClick={() => handleEdit(data.id)}
                      >
                        <BiEdit />
                      </Button>
                      &nbsp;
                      <Button
                        type="button"
                        className="delete"
                        onClick={() => handleDelete(data.id)}
                      >
                        <BsTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Content;
