import styled from '@emotion/styled';

const Bounded = ({ as: Comp = 'div', children, className, margin, id }) => {
  return (
    <Comp className={className}>
      <StyledDiv margin={margin} id={id}>
        {children}
      </StyledDiv>
    </Comp>
  );
};

const StyledDiv = styled.div`
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  margin-bottom: ${({ margin }) => (margin ? '100px' : null)};
  scroll-margin-top: 100px;
  @media only screen and (min-width: 1240px) {
    max-width: 1152px;
    margin-bottom: ${({ margin }) => (margin ? '250px' : null)};
    scroll-margin-top: 180px;
  }
  @media only screen and (min-width: 1540px) {
    max-width: 1352px;
  }
`;

export default Bounded;
