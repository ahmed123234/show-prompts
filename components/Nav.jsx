'use client'
//move to other pages inside the appliction
import Link from "next/link" 
// optimize the images for us 
import Image from "next/image"
import { useState, useEffect } from "react"
// getProviders: enables you to use the authuntication provider 
// this is basicly can be google provider or so
import {signIn, signOut, useSession, getProviders } from 'next-auth/react' 


const LoginOrRegister = ({ providers }) => (
  <>
            {providers && Object.values(providers).map((provider) => (
              <button type="button"
                key={ provider.name }
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                sign in by {provider.name}
              </button>
            )) }
          </>
)

const Nav = () => {
  // const isUserLogigedIn = true;
  const { data: session } = useSession();
  
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, settoggleDropDown] = useState(false);
  // thats going to allow us to sign in using google and next auth
  
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setUpProviders();
    
  }, [])

  return (
    <nav className="w-full mt-4 mb-16 flex-between">
      <Link href='/' className="flex gap-2 flex-center">
        <Image src='/assets/images/logo.svg' 
          width={30} 
          height={30} 
          alt="Promptopia Logo"
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex">
        {session?.user ? (
          <div className="flex gap-3 sm:gap-5">
            <Link href='/create-prompt'
              className="black_btn"
            >create post</Link>
            <button onClick={()=>signOut()} 
              className="outline_btn"
            >
              sign out
            </button>
            <Link href='/profile' 
              className=""
            >
              <Image src={session?.user.image}
                width={37}
                height={37}
                alt="Profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ): (
          <LoginOrRegister providers={providers}/>
        ) }
      </div>

      {/* Mobile Navigation */}

      <div className="relative flex sm:hidden">
        {
          session?.user ? (
            <div className="flex">
              <Image src={session?.user.image}
                width={37}
                height={37}
                alt="Profile"
                className="rounded-full cursor-pointer"
                onClick={() => settoggleDropDown(prev => !prev)}
              />

              {toggleDropDown && (
                <div className="dropdown">
                  <Link href='/profile'
                    className="dropdown_link"
                    onClick={() => settoggleDropDown(false)}
                  >
                    My Profile
                  </Link>

                  <Link href='/create-prompt'
                    className="dropdown_link"
                    onClick={() => settoggleDropDown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      settoggleDropDown(false);
                      signOut();
                    }}
                    className="w-full mt-5 capitalize black_btn"
                  >
                    sign out
                  </button>
                </div>
              )}
            </div>
          )
        : (
          <LoginOrRegister providers={providers} />
        )}
      </div>
    </nav>
  )
}

export default Nav