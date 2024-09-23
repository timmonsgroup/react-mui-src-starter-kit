// Stylesheets
import "@styles/home.scss"; //This still needs the ./ syntax. scss be wierd

// Third party libraries
import { type FC, useEffect /* , useState */ } from "react";

// MUI imports
import { Button, Container, Typography /* , Button */ } from "@mui/material";

// import ICON_URL from "@assets/icon.png";
import SplashBG from "@assets/splashBackground.png";
import { BASE_TITLE } from "@constants";

const Home: FC = () => {
  // State to hold API response
  // const [apiResponse, setApiResponse] = useState("");

  // Set the page title on mount and fetch data from API
  useEffect(() => {
    document.title = BASE_TITLE;

    // Fetch data from API
    // fetch(window.location.origin + "/api/hello")
    //   .then((response) => response.json())
    //   .then((data) => setApiResponse(data));
  }, []);

  // React router is dumb sometimes and likes to think that the profileUrl is a route
  // So I have to do this to get it to work
  // const profileUrl = `https://${window.location.hostname}/user/organization/`; //domainUrl();

  return (
    <>
      <div className="hero-area">
        <img className="hero-image" alt="splash background" src={SplashBG} />
        {/* <img
          className="hero-icon-badge"
          alt="Logo badge"
          src={ICON_URL}
          data-test="logo"
        /> */}
        <div className="hero-text-wrapper">
          <div className="hero-bottom-docker">
            <Container>
              <Typography variant="h4" component="h1" className="hero-text">
                Welcome to the {BASE_TITLE}!
              </Typography>
            </Container>
          </div>
        </div>
      </div>
      <Container className="splash" maxWidth={false} disableGutters>
        <div className="blurb">
          <Container>
            <Typography variant="homeBlurb">
              {/* The LCWPP is super cool */}
            </Typography>
          </Container>
        </div>
        <div className="mission">
          <Container>
            <h2 className="misson-header">Our Mission</h2>
            <p className="mission-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a
              egestas velit, sit amet consequat eros. Praesent porttitor sed
              urna congue ultricies. Integer et iaculis mi. Mauris massa mauris,
              tincidunt et libero ac, feugiat sollicitudin leo. Proin vitae
              lorem non tortor tempor convallis eget vitae metus. Nulla semper
              justo quis augue porttitor luctus. Duis varius ante id elit
              feugiat, sit amet pharetra arcu hendrerit. Quisque eget diam eget
              libero cursus dapibus eu at velit. Curabitur mattis nisi augue, et
              posuere quam tincidunt ac. Etiam maximus tempor quam, finibus
              interdum ante congue quis. Phasellus placerat erat quis dignissim
              dignissim. In a dui sit amet nunc mattis cursus. Proin felis
              risus, tempor non nunc pellentesque, sollicitudin molestie est.
            </p>
            <p className="mission-body">
              Donec sed neque efficitur, porta tortor nec, maximus leo.
              Phasellus congue erat lacus, sit amet vulputate ante rhoncus et.
              Quisque interdum, nisi sit amet varius dapibus, velit eros egestas
              neque, nec eleifend augue massa eu lorem. Vivamus sit amet metus
              ut eros laoreet euismod auctor aliquam tortor. Duis aliquet
              fringilla ipsum, id hendrerit felis pulvinar quis. Pellentesque
              placerat lectus dui, a efficitur mauris egestas id. Vivamus vel
              dignissim elit. Phasellus convallis neque at eros pretium
              ultricies non ut diam. Cras eget mi vel sem efficitur accumsan.
              Mauris a magna urna. Mauris pellentesque augue sed est posuere, eu
              finibus erat vehicula. Vivamus ornare arcu sed pulvinar suscipit.
              Maecenas placerat tellus eu quam pretium, quis mattis ex iaculis.
              Curabitur ultrices tellus scelerisque felis ornare blandit.
              Suspendisse cursus elit nec porta ultricies.
            </p>
            {/* <p className="mission-body">
              Is to be the coolest ever
            </p>
            <p className="mission-body">
              Here is a fetch to the API:
            </p>
            <p className="mission-body">
              RESPONSE: {JSON.stringify(apiResponse)}
            </p> */}
          </Container>
        </div>
        <div className="footerArea">
          <Container>
            <Typography
              variant="h4"
              component="h3"
              className="footerTitle"
              marginBottom={2}
            >
              Need Access to the App?
            </Typography>
            <Typography variant="homeBlurb">
              Standby this feature is not ready yet...
            </Typography>
            <Button
              className="footerButton"
              size="large"
              color="progressive"
              href={window.location.origin + "/"}
            >
              Work in Progress
            </Button>
          </Container>
        </div>
      </Container>
    </>
  );
};

export default Home;
