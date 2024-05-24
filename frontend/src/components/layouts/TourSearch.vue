<template>
    <div class="p-10 rounded-3xl border shadow-xl mb-10 mt-6 bg-white">
      <div class="text-center">
        <h1 class = "font-bold text-4xl text-textColor">Bạn muốn đến địa điểm Hà Nội nào?</h1>
        <p class="font-normal opacity-60 mt-4 text-lg">Hơn 100 địa điểm đẹp đang chờ bạn</p>
      </div>
      <form action="" class="flex justify-around mt-6">
        <input type="text" class=" border border-gray-300 text-gray-900 text-lg rounded-3xl  focus:border-primary w-1/2 p-3 mr-2" placeholder="Nhập tên địa điểm ...">
        <select id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-3xl  block w-52 p-3 ">
            <option >Tất cả mức giá</option>
            <option >Từ 1 đến 3 triệu</option>
            <option >Từ 3 đến 5 triệu</option>
            <option >Từ 5 triệu</option>
        </select>
        <button type="button" class="text-secondary bg-primary hover:bg-secondary hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-lg px-6 py-3 ">Tìm kiếm</button>
      </form>
    </div>
</template>