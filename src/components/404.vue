<template>
    <div class="not-found">
        <div class="not-found-form">
            <div class="not-found-title">
                <router-link to="/manage">
                    <h1>404 Not Found</h1>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.not-found {
    width: 100%;
    height: 100%;
    background: #324057;
    .not-found-title {
        margin-bottom: 60px;
        h1 {
            color: #fff;
            font-size: 120px;
            text-align: center;
        }
    }
    .not-found-form {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
    }
}
</style>