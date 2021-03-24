const clearAuthScreen = () => {
    document.getElementById('firebaseui-container')!.remove();
    document.getElementById('bg-container')!.remove();
    document.getElementById('logo-container')!.remove();
    document.getElementById('root')!.style.display = 'block';
}

export default clearAuthScreen;