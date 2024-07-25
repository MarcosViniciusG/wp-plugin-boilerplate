<?php
/*
Plugin Name: Cronômetro
Description: Um plugin feito para mostrar um cronômetro até 2030
*/

//Display de erros
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// // Gancho para inicializar o script em todas as páginas
// add_action('wp_enqueue_scripts', 'carregar_scripts');

// Função para carregar os scripts
function carregar_scripts() {
    wp_enqueue_script('meu-script', plugins_url('/js/script.js', __FILE__));
}

// Função para carregar o HTML
function carregar_html() {
    // Obtém o caminho do arquivo HTML
    $arquivo_html = plugin_dir_path(__FILE__) . 'html/index.html';

    // Retorna o conteúdo do arquivo HTML
    return file_get_contents($arquivo_html);
}

// Função para carregar os estilos
function carregar_estilos() {
    wp_enqueue_style('meu-style', plugins_url('/css/styles.css', __FILE__));
}

function shortcode() {
    // Obtém o conteúdo do arquivo HTML
    $html_content = carregar_html();
    carregar_scripts();
    carregar_estilos();
    
    // Retorna o conteúdo do arquivo HTML
    return $html_content;
}

// Registra o shortcode com o nome 'cronometro'
add_shortcode('cronometro', 'shortcode');