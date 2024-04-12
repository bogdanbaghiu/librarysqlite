import styled from 'styled-components/native'

interface Props {
    children?: React.ReactNode
    testID?: string
}

export default function ScreenLayout({ children, testID }: Props) {

    return <S.Wrapper testID={testID}>{children}</S.Wrapper>
}

const S = {
    Wrapper: styled.View`
    flex: 1;
  `
}
