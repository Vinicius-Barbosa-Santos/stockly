import Header, { HeaderLeft, HeaderSubtitle, HeaderTitle } from "./_components/header";

export default function Home() {
  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      <Header>
        <HeaderLeft>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderSubtitle>Visão Geral dos dados</HeaderSubtitle>
        </HeaderLeft>
      </Header>
    </div>
  );
}
