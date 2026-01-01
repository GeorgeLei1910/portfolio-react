module.exports = {
    apps: [
      {
        name: 'portfolio-backend',
        script: './server.js',
        cwd: '/app/backend',
        instances: 1,
        exec_mode: 'fork',
        env: {
          NODE_ENV: 'production',
          PORT: 5000,
          HOST: '127.0.0.1',
          DATABASE_URL: process.env.DATABASE_URL || 'sqlite3:///app/sqlite3_data/portfolio_db'
        },
        error_file: '/app/logs/backend-error.log',
        out_file: '/app/logs/backend-out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        autorestart: true,
        max_restarts: 10,
        min_uptime: '10s',
        max_memory_restart: '1G'
      },
      {
        name: 'portfolio-frontend',
        script: 'nginx',
        args: '-g "daemon off;"',
        instances: 1,
        exec_mode: 'fork',
        error_file: '/app/logs/frontend-error.log',
        out_file: '/app/logs/frontend-out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        autorestart: true,
        max_restarts: 10,
        min_uptime: '10s'
      }
    ]
};