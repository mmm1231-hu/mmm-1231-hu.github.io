module.exports = {
    apps: [
        {
            name: "Respect-Server",
            script: "index.js",
            watch: false,
            env: {
                NODE_ENV: "production",
                PORT: 4001
            },
            max_restarts: 10,
            error_file: "./logs/error.log",
            out_file: "./logs/out.log",
            log_file: "./logs/combined.log",
            merge_logs: true,
        }
    ]
}
/*
icon
user d0_30
https://discord.gg/BP9bbdfd7y

https://discord.gg/gs1
*/
