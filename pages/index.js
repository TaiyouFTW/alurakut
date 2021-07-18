import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
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

function ProfileRelationsBoxFollowers(properties) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {properties.title} ({properties.items.length})
      </h2>
      <ul>
        {properties.items.map((item) => {
          return (
            <li key={item.id}>
              <a href={item.avatar_url}>
                <img src={item.avatar_url} />
                <span>{item.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  const randomUser = props.githubUser;

  const [communities, setCommunities] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);
  React.useEffect(function () {
    fetch(`https://api.github.com/users/${randomUser}/followers`)
      .then(function (userFollowers) {
        return userFollowers.json();
      })
      .then(function (completeUserFollowers) {
        setFollowers(completeUserFollowers);
      })

    fetch('/api/community', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(async (response) => {
        const data = await response.json();
        const updatedCommunities = data;
        setCommunities(updatedCommunities);
      })
  }, [])



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
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: randomUser,
              }

              fetch('/api/community', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(community)
              })
                .then(async (response) => {
                  const data = await response.json();
                  const updatedCommunities = [...communities, data];
                  setCommunities(updatedCommunities);
                })
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
          <ProfileRelationsBoxFollowers title="Seguidores" items={followers} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>
            <ul>
              {communities.slice(0, 6).map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/communities/${item.id}`}>
                      <img src={item.imageUrl} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <Relations title={'Pessoas da comunidade'} items={favUsers}></Relations>
          </ProfileRelationsBoxWrapper>

        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((resposta) => resposta.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    },
  }
}