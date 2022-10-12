import styled from "styled-components"

export const ControllerBarContainer = styled.div`
  background-color: ${props => props.theme.primary_bgColor};
  color: ${props => props.theme.primary_color};
  width: 100%;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 0.0625rem solid #9370db;
  user-select: none;
`
export const ControllerWrapper = styled.div`
  display: flex;
  width: 90%;
`

export const SongCover = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
export const SongCoverImg = styled.img`
  width: 3.75rem;
  border-radius: 0.3125rem;
`
export const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
  max-width: 260px;
  overflow: hidden;
`
export const SongTitle = styled.span`
  display: flex;
  font-size: 1.125rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
export const Artist = styled.span`
  display: flex;
  font-size: 0.875rem;
`
