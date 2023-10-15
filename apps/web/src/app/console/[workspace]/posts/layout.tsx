export default function PostLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      {props.children}
      {props.modal}
    </>
  )
}
