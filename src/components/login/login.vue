<template>
    <div class="login-container">
        <div class="img-content">
            <img src="../../assets/image/fundo.jpg" alt="">
        </div>
        <div class="form-container">
            <div class="img-form">
                <img src="../../assets/image/Logo.png" alt="">
            </div>
            <form action="">
                <label for="login-user">DIGITE SEU USUÁRIO E SENHA PARA FAZER LOGIN:</label>
                <input id="login-user" type="text" placeholder="Usuário">
            </form>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.login-container{
    position: fixed; /* fixa no topo da página */
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    background-color: #FFF;
    width: 100%;
    height: 100VH;
    text-align: center;
    align-items: center;
}

.img-content img{
    width: 100%;
    height: 100vh;
}

.img-form{
    widows: 200px;
}
</style>