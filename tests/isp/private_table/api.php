<?php

session_start();

// Correct credentails
$user       = 'test';
$password   = 123;

// expiration in seconds
$inactive   = 10;

//response template
$response = array(
    'success' => false,
    'data' => array(),
    'message' => array(
        'code' => 200
    ),
    'error' => array()
);

// checks expiration
if (isset($_SESSION['start_time'])) {
    $session_life = time() - $_SESSION['start_time'];
    if ($session_life > $inactive) {
        session_unset();
        session_destroy();
    }
}

// checks authorization
if ($_SESSION['authorized'] <> 1) {

    if (isset($_POST['user']) && isset($_POST['password'])) {

        if ($_POST['user'] == $user && $_POST['password'] == $password) {
            // credentails correct
            $response['success'] = true;
            $response['message']['text'] = 'Authorized';
            $_SESSION['authorized'] = 1;
            $_SESSION['start_time'] = time();
        } else {
            // credentails uncorrect
            $response['message']['text'] = 'Incorrect credentials';
        }
    } else {
        // Unauthorized
        $response['message']['code'] = 401;
        $response['message']['text'] = 'Not authorized';
    }
} else {
    // Authorized
    $response['success'] = true;
    $response['data'] = array();
    // Generate data
    for ($i = 0; $i < 30; $i++) {
        $response['data'][] = array(
            'id' => $i,
            'ip' => long2ip(rand(0, 255 * 255) * rand(0, 255 * 255)),
            'time' => gmDate("Y-m-d\TH:i:sP"),
            'count' => rand(0, 255 * 255)
        );
    }
}

// returns the response in JSON format
echo json_encode($response);
?>
