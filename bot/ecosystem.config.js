module.exports = {
  apps: [{
    name: 'phuketgo-bot',
    script: './welcome-message.js',
    
    // Настройки процесса
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '300M',
    
    // Окружение
    env: {
      NODE_ENV: 'production'
    },
    
    // Логи
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    
    // Стратегия перезапуска
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000
  }]
};
