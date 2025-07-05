// العناصر
const productsList = document.getElementById('products-list');

// تسجيل الدخول
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        alert("تم التسجيل بنجاح!");
        loadProducts();
    } catch (error) {
        alert("خطأ: " + error.message);
    }
}

// تسجيل الخروج
function logout() {
    auth.signOut();
    alert("تم تسجيل الخروج");
}

// إضافة منتج
async function addProduct() {
    const name = document.getElementById('product-name').value;
    
    try {
        await db.collection('products').add({
            name: name,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("تمت الإضافة!");
        loadProducts();
    } catch (error) {
        alert("خطأ في الإضافة: " + error.message);
    }
}

// عرض المنتجات
async function loadProducts() {
    try {
        const snapshot = await db.collection('products').get();
        productsList.innerHTML = '';
        
        snapshot.forEach(doc => {
            const product = doc.data();
            productsList.innerHTML += `
                <div>
                    <p>${product.name} 
                    <button onclick="deleteProduct('${doc.id}')">حذف</button></p>
                </div>
            `;
        });
    } catch (error) {
        alert("خطأ في التحميل: " + error.message);
    }
}

// حذف منتج
async function deleteProduct(id) {
    try {
        await db.collection('products').doc(id).delete();
        alert("تم الحذف!");
        loadProducts();
    } catch (error) {
        alert("خطأ في الحذف: " + error.message);
    }
}

// متابعة حالة المصادقة
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("User is signed in:", user.email);
    } else {
        console.log("User is signed out");
    }
});
