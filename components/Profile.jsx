import { PromptCard } from '@components'

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full '>
      <h1 className='text-left capitalize head_text'>
        <span className="blue_gradient">
          {name} profile
        </span>
      </h1>
      <p className="text-left desc">{desc}</p>

      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard key={post.id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>

    </section>
  )
}

export default Profile