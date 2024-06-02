export function createGallery(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
	<a class="gallery-link" href="${largeImageURL}">
		<img
            class="gallery-img"
            src="${webformatURL}"
            alt="${tags}"
        />
        <ul class="gallery-descript">
        <li class="gallery-descript__item"><span class="gallery-descript__span">likes</span> ${likes}</li>
        <li class="gallery-descript__item"><span class="gallery-descript__span">Views</span> ${views}</li>
        <li class="gallery-descript__item"><span class="gallery-descript__span">Coments</span> ${comments}</li>
        <li class="gallery-descript__item"><span class="gallery-descript__span">Dowloads</span> ${downloads}</li>
     </ul>
	</a>
</li>`
    )
    .join('');
}
