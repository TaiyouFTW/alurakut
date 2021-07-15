import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { Relations } from '../src/components/Relations';

function ProfileSidebar(properties) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${properties.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${properties.githubUser}`}>
          @{properties.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const randomUser = 'taiyouftw';
  const [communities, setCommunities] = React.useState([{
    id: '12802378123789378912789789123896123',
    name: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  },
  {
    id: '12802378123789378912789789123896124',
    name: 'Queria sorvete, mas era feijão',
    image: 'http://4.bp.blogspot.com/-kev3O816_hk/UIXk-TtxSoI/AAAAAAAABhc/TCR53xfkh-M/s1600/DSC05604.JPG'
  }]);

  const favUsers = [
    {
      id: 'gregoriVieira',
      name: 'gregoriVieira',
      image: 'https://github.com/gregoriVieira.png'
    },
    {
      id: 'BetoMatias',
      name: 'BetoMatias',
      image: 'https://github.com/BetoMatias.png'
    },
    {
      id: 'augusto-roct',
      name: 'augusto-roct',
      image: 'https://github.com/augusto-roct.png'
    },
    {
      id: 'rafaballerini',
      name: 'rafaballerini',
      image: 'https://github.com/rafaballerini.png'
    },
    {
      id: 'peas',
      name: 'peas',
      image: 'https://github.com/peas.png'
    },
    {
      id: 'omariosouto',
      name: 'omariosouto',
      image: 'https://github.com/omariosouto.png'
    },
  ]

  return (
    <>
      <AlurakutMenu githubUser={randomUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={randomUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const community = {
                id: new Date().toISOString(),
                name: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }
              const updatedCommunities = [...communities, community];
              setCommunities(updatedCommunities)
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <Relations title={'Pessoas da comunidade'} items={favUsers}></Relations>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <Relations title={'Comunidades'} items={communities}></Relations>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}