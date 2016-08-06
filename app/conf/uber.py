#ssh -i LI_laptop.pem -L 3306:127.0.0.1:3306 ubuntu@ec2-52-53-247-80.us-west-1.compute.amazonaws.com
config = {
    "mysql": {
        "user" : "uber",
        "host" : "127.0.0.1",
        "password" : "",
        "port" : 3306,
        "db" : "uber"
    }
}
