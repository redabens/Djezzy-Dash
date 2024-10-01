import "../styles/WhiteLogo.css";
function WhiteLogo() {
  return (
    <div className="WhiteLogoWithName">
      <img
        className="Whitelogo"
        src="/assets/logo_djezzy_whiteVersion.svg"
        alt="logo_djezzy"
      />
      <div className="WhiteNom">
        <h3>DJEZZY DASH</h3>
        <h3 id="arabe">جازي داش</h3>
      </div>
    </div>
  );
}
export default WhiteLogo;
