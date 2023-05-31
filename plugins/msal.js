import * as msal from "@azure/msal-browser";

export default defineNuxtPlugin((nuxtApp) => {
  const userNew = useUser();
  // Config object to be passed to Msal on creation
  const msalConfig = {
    auth: {
      clientId: "b56ef9e8-1c21-4679-9267-88c7f5fa7785",
      authority: "https://login.microsoftonline.com/organizations",
      redirectUri: "https://kalenderoverblik.netlify.app/", // Must be registered as a SPA redirectURI on your app registration
      postLogoutRedirectUri: "/", // Must be registered as a SPA redirectURI on your app registration
    },
    cache: {
      cacheLocation: "localStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
  };
  // Create the MSAL application object
  const myMSAL = new msal.PublicClientApplication(msalConfig);

  // Catch redirect callbacks
  myMSAL
    .handleRedirectPromise()
    .then((accessTokenResponse) => {
      handleResponse(accessTokenResponse);
    })
    // eslint-disable-next-line node/handle-callback-err
    .catch((err) => {
      console.log(err);
      // catch any errors during the authentication process
    });
  // Handle the response from AAD
  function handleResponse(resp) {
    if (resp !== null) {
      myMSAL.setActiveAccount(resp.account);
      const user = {
        isUserSignedIn: true,
        name: resp.account.name,
        id: resp.account.localAccountId,
        homeId: resp.account.homeAccountId,
        country: resp.account.idTokenClaims.country,
      };
      userNew.value = user;
      // store.commit("user/setUser", user);
    }
  }

  // Add here scopes for id token to be used at MS Identity Platform endpoints.
  const loginRequest = {
    scopes: ["User.ReadWrite"],
  };
  // Sign in the user
  function signIn() {
    return myMSAL.loginRedirect(loginRequest);
  }
  // Get the account object of the signed-in user
  function getAccounts() {
    return myMSAL.getAllAccounts();
  }
  // Sign out the user
  function signOut(accountId) {
    const logoutRequest = {
      account: myMSAL.getAccountByHomeId(accountId),
    };
    return myMSAL.logoutRedirect(logoutRequest);
  }

  // Get acces token for calling API's
  function getToken() {
    const activeAccount = myMSAL.getAllAccounts()[0];
    const tokenRequest = {
      scopes: [
        "https://<yourtentant>.onmicrosoft.com/<yourapiexposed>/<yourapi.permission>",
      ],
      account: activeAccount,
    };
    return myMSAL
      .acquireTokenSilent(tokenRequest)
      .then(function (accessTokenResponse) {
        const accessToken = accessTokenResponse.accessToken;
        return accessToken;
      })
      .catch(function (error) {
        // eslint-disable-next-line no-undef
        if (error instanceof InteractionRequiredAuthError) {
          myMSAL
            .acquireTokenPopup(tokenRequest)
            .then(function (accessTokenResponse) {
              const accessToken = accessTokenResponse.accessToken;
              return accessToken;
            })
            // eslint-disable-next-line node/handle-callback-err
            .catch(function (error) {
              // catch any errors during the authentication process
            });
        }
        // catch any errors during the authentication process
      });
  }
  // inject functions on vue instance
  nuxtApp.provide("signIn", () => signIn());
  nuxtApp.provide("getAccounts", () => getAccounts());
  nuxtApp.provide("signOut", () => signOut());
  nuxtApp.provide("getToken", () => getToken());

  // inject("msal", {
  //   signIn,
  //   getAccounts,
  //   signOut,
  //   getToken,
  // });
});
