const AuthPagesText = (props: { title: string; text: string }) => {
  return (
    <div className="auth-content__text">
      <h2 className=" heading-primary">{props.title}</h2>
      <p className="heading-tertiary">{props.text}</p>
    </div>
  );
};

export default AuthPagesText;
