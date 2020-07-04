//change details about your app
var client = new hivesigner.Client({
  app: "fbslo-b",
  callbackURL: "http://localhost:3000/posts/",
  scope: ["vote", "comment"],
});

//check if there is token in URL
(function () {
  let params = new URL(location).searchParams; //get access token from URL
  const token = params.get("access_token") || localStorage.getItem("hs_token");
  if (token !== "" && token !== "null" && token != null) {
    localStorage.setItem("hs_token", token); //store token to local storage
    client.setAccessToken(token); //add token to client
  }
})();

function hs_helper_isUserSaved() {
  setAccessToken();
}

function hs_helper_login(callback) {
  params = {};
  client.login(params, function (err, token) {
    callback(err, token);
  });
}

function hs_helper_logout(callback) {
  client.revokeToken(function (err, res) {
    callback(err, res);
  });
  localStorage.removeItem("hs_token");
}

function setAccessToken() {
  let params = new URL(location).searchParams; //get access token from URL
  const token = params.get("access_token") || localStorage.getItem("hs_token");
  if (token != "" && token != "null" && token != null) {
    localStorage.setItem("hs_token", token); //store token to local storage
    client.setAccessToken(token); //add token to client
    return true;
  } else {
    return false;
  }
}

async function hs_helper_get_user_details(callback) {
  client.setAccessToken(sessionStorage.hs_token); //add token to client

  client.me(function (err, res) {
    callback(err, res);
  });
}

async function hs_helper_vote(voter, author, permlink, weight, callback) {
  let isTokenSet = await setAccessToken();
  if (isTokenSet) {
    client.vote(voter, author, permlink, weight, function (err, res) {
      callback(err, res);
    });
  } else {
    callback("Access token is not available!", null);
  }
}

async function hs_helper_comment(
  parentAuthor,
  parentPermlink,
  author,
  permlink,
  title,
  body,
  jsonMetadata,
  callback
) {
  client.setAccessToken(sessionStorage.hs_token); //add token to client
  client.comment(
    parentAuthor,
    parentPermlink,
    author,
    permlink,
    title,
    body,
    jsonMetadata,
    function (err, res) {
      callback(err, res)
    }
  );
}

async function hs_helper_delete_comment(author, permlink, callback) {
  let isTokenSet = await setAccessToken();
  if (isTokenSet) {
    client.deleteComment(author, permlink, function (err, res) {
      callback(err, res);
    });
  } else {
    callback("Access token is not available!", null);
  }
}

async function hs_helper_custom_json(
  requiredAuths,
  requiredPostingAuths,
  id,
  json,
  callback
) {
  let isTokenSet = await setAccessToken();
  if (isTokenSet) {
    client.customJson(requiredAuths, requiredPostingAuths, id, json, function (
      err,
      res
    ) {
      callback(err, res);
    });
  } else {
    callback("Access token is not available!", null);
  }
}

async function hs_helper_transfer(to, amount, memo, callback) {
  let isTokenSet = await setAccessToken();
  if (isTokenSet) {
    const op = [
      "transfer",
      {
        from: "__signer",
        to: to,
        amount: amount, //format: 1.000 HIVE
        memo: memo,
      },
    ];
    hivesigner.sendOperation(op, {}, function (err, result) {
      callback(err, result);
    });
  } else {
    callback("Access token is not available!", null);
  }
}

async function hs_helper_reblog(account, author, permlink, callback) {
  let isTokenSet = await setAccessToken();
  if (isTokenSet) {
    client.reblog(account, author, permlink, function (err, res) {
      callback(err, res);
    });
  } else {
    callback("Access token is not available!", null);
  }
}

async function hs_helper_follow(follower, following, callback) {
  let isTokenSet = await setAccessToken();
  if (isTokenSet) {
    client.follow(follower, following, function (err, res) {
      callback(err, res);
    });
  } else {
    callback("Access token is not available!", null);
  }
}

async function hs_helper_unfollow(unfollower, unfollowing, callback) {
  let isTokenSet = await setAccessToken();
  if (isTokenSet) {
    client.unfollow(unfollower, unfollowing, function (err, res) {
      callback(err, res);
    });
  } else {
    callback("Access token is not available!", null);
  }
}

async function hs_helper_ignore(follower, following, callback) {
  let isTokenSet = await setAccessToken();
  if (isTokenSet) {
    client.ignore(follower, following, function (err, res) {
      callback(err, res);
    });
  } else {
    callback("Access token is not available!", null);
  }
}

async function hs_helper_claim_balance(
  account,
  rewardHive,
  rewardHbd,
  rewardVests,
  callback
) {
  let isTokenSet = await setAccessToken();
  if (isTokenSet) {
    client.claimRewardBalance(
      account,
      rewardSteem,
      rewardSbd,
      rewardVests,
      function (err, res) {
        callback(err, res);
      }
    );
  } else {
    callback("Access token is not available!", null);
  }
}
