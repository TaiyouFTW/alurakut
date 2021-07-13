import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

function ProfileSidebar(properties) {
  return (
    <Box>
      <img src={`https://github.com/${properties.githubUser}.png`} style={{ borderRadius: '8px' }}></img>
    </Box>
  );
}

export default function Home() {

  const githubUser = 'taiyouftw';
  const personalFavorites = ['gregoriVieira', 'BetoMatias', 'augusto-roct'];

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>

        <div style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title"> Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>

        <div style={{ gridArea: 'profileRelationsArea' }}>
          <Box>
            Comunidades
          </Box>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da comunidade ({personalFavorites.length})</h2>
            <ul>
              {personalFavorites.map((person) => {
                return (
                  <li>
                    <a href={`/users/${person}`}>
                      <img src={`https://github.com/${person}.png`} />
                      <span>{person}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
