import styled from "styled-components";
import {
  Link as LinkBase,
} from "react-router-dom";

const Link = styled(LinkBase)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default Link;
