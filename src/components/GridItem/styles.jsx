import styled from "styled-components";

export const GridItem = styled.p`
  line-height: 0;
  padding: 3rem 2rem;
  font-size: 3rem;
  grid-column: ${(props) => (props.grow ? "1/3" : "auto")};
  text-align: center;
  background-color: #e0e0e0;
  cursor: pointer;
  
  :nth-child(4n), :nth-child(19) {
    background-color: orange;
    color: white;
  }
`