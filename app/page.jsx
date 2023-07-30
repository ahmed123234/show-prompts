import { Feed } from "@components"

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='text-center head_text'>Discover & Share</h1>
      <br className="max-md:hidden" />
      <h1 className="orange_gradient text-center font-bold text-5xl">AI-Powered Prompts</h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool 
        for modern world rol disciver, 
        create and share creative prompts
      </p>

      {/* Feed component */}
      <Feed />
    </section>
  )
}

export default Home