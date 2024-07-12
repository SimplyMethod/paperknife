export default function PostLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">{props.children}</div>
      {props.modal}
    </>
  );
}
