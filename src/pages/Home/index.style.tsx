import styled from "styled-components"

export const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background-color: ${props => props.theme.primary_bgColor};
  color: ${props => props.theme.primary_color};
  padding: 0 10% 1.25rem 10%;
  user-select: none;
  
`
export const SongListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 2.5rem;
`
