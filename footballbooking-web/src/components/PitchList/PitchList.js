import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap";
import "../PitchReq/pitchrequest.css";
import axiosClientPost from "../../api/axiosClientPost";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: auto;
  background: linear-gradient(
      rgba(255, 255, 255, -0.4),
      rgba(255, 255, 255, -0.4)
    ),
    url("https://images5.alphacoders.com/571/thumb-1920-571559.jpg") center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom:20px;
`;

const Title = styled.h1`
  color: white;
`;

const Wrapper = styled.div`
  width: 95%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  min-height: 450px;
`;

const Menu = styled.span`
  font-weight: bold;
  display: flex;
  cursor: pointer;
  padding-bottom: 20px;
  justify-content: space-between;
`;

const Action = styled.div`
  display: flex;
  flex-direction: column;
`;

const PitchList = () => {
  const navigate = useNavigate();
  const [pitchList, setPitchList] = useState([]);
  const getPitchList = async () => {
    var data = new FormData();
    var config = {
      url: "/pitchservice/getMyPitch",
      method: "GET",
      data,
      headers: {
        Authorization: localStorage.getItem("token"),
        ...data.getHeaders,
      },
    };

    axiosClientPost(config)
      .then((response) => {
        setPitchList(response.data);
      })
      .catch(() => {
        navigate("/login");
      });
  };
  useEffect(() => {
    getPitchList();
  }, []);

  const createNewPitch = () => {
    navigate("/pitchowner/createNewPitch");
  }

  const addMiniPitch = (pitchId) => {
    navigate(`/pitchowner/addMiniPitch/${pitchId}`);
  }

  const deletePitch = (pitchId) => {
    var data = new FormData();
    var config = {
      url: `/pitchservice/deletePitch/${pitchId}`,
      method: "POST",
      data,
      headers: {
        Authorization: localStorage.getItem("token"),
        ...data.getHeaders,
      },
    };

    axiosClientPost(config)
      .then(() => {
        getPitchList();
      })
      .catch(() => {
      });
  }
  return (
    <div>
      <Container>
        <Title style={{ marginBottom: "10px", marginTop: "65px" }}>DANH S??CH S??N B??NG</Title>
        <Wrapper>
          <Menu>
            <div>
              <a style={{ marginRight: "30px" }}>Y??u c???u ?????t s??n</a>
              <a>Danh s??ch s??n</a>
            </div>
            <button onClick={createNewPitch} className="btn btn-success">T???o s??n m???i</button>
          </Menu>
          <Table className="list">
            <thead>
              <tr>
                <th>#</th>
                <th>Lo???i</th>
                <th>Th??ng tin s??n</th>
                <th>???nh ?????i di???n</th>
                <th>T??c v???</th>
              </tr>
            </thead>
            <tbody>
              {pitchList.map((pitch, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>B??ng ????</td>
                    <td>
                      {pitch.name} <br />
                      {`${pitch.address.number} ${pitch.address.street}, ${pitch.address.commune}, ${pitch.address.district}, ${pitch.address.city}`}
                    </td>
                    <td>
                      <img style={{ width: 120, height: 120 }} src={pitch.coverAvatarLink}></img>
                    </td>
                    <td>
                      <Action>
                        <button style={{ marginBottom: 5 }} className="btn btn-success" onClick={() => addMiniPitch(pitch.pitchId)}>Th??m s??n th??nh ph???n</button>
                        <button style={{ marginBottom: 5 }} className="btn btn-danger" onClick={() => deletePitch(pitch.pitchId)}>X??a</button>
                      </Action>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Wrapper>
      </Container>
    </div>
  );
};

export default PitchList;
