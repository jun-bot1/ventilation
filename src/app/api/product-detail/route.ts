import { NextRequest, NextResponse } from 'next/server';

const NAVIEN_URLS: Record<string, string> = {
  THE6500_150: 'https://www.navienhouse.com/products/G2000030095',
  THE6500_200: 'https://www.navienhouse.com/products/G2000030093',
  TAA531: 'https://www.navienhouse.com/products/view/G2000029753',
  TAA530: 'https://www.navienhouse.com/products/view/G2000029753',
  TAE530: 'https://www.navienhouse.com/products/view/G2000029788',
  TAE330: 'https://www.navienhouse.com/products/view/G2000029788',
};

export async function GET(request: NextRequest) {
  const modelId = request.nextUrl.searchParams.get('modelId');
  if (!modelId || !NAVIEN_URLS[modelId]) {
    return NextResponse.json({ error: 'Invalid modelId' }, { status: 400 });
  }

  try {
    const targetUrl = NAVIEN_URLS[modelId];
    const res = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    });
    let html = await res.text();

    // CSS/JS/이미지 리소스 경로만 절대경로로 변환
    html = html.replace(/<link([^>]*?)href="\/(?!\/)/g, '<link$1href="https://www.navienhouse.com/');
    html = html.replace(/<script([^>]*?)src="\/(?!\/)/g, '<script$1src="https://www.navienhouse.com/');
    html = html.replace(/<img([^>]*?)src="\/(?!\/)/g, '<img$1src="https://www.navienhouse.com/');

    // </head> 앞에 주입: fetch 인터셉터 + 에러 모달 억제 + DOM 정리
    const injected = `
<script>
// 1) fetch 인터셉터: 상대경로 API 호출을 navienhouse.com으로 리다이렉트
(function() {
  var _fetch = window.fetch;
  window.fetch = function(url, opts) {
    if (typeof url === 'string' && url.startsWith('/') && !url.startsWith('//')) {
      url = 'https://www.navienhouse.com' + url;
      opts = opts || {};
      opts.mode = 'cors';
      opts.credentials = 'omit';
    }
    return _fetch.call(this, url, opts).catch(function() {
      return new Response('{}', { status: 200, headers: { 'Content-Type': 'application/json' } });
    });
  };
  // XMLHttpRequest도 인터셉트
  var _open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url) {
    if (typeof url === 'string' && url.startsWith('/') && !url.startsWith('//')) {
      url = 'https://www.navienhouse.com' + url;
    }
    return _open.apply(this, [method, url].concat(Array.prototype.slice.call(arguments, 2)));
  };
})();

// 2) 에러 모달/알림 억제
window.alert = function() {};
window.confirm = function() { return true; };
</script>
<style id="nav-cleanup">
  .header-sub, .main-image-wrapper, .prdDetailMainInfoArea,
  .topArea, .prdOptionAreaFooter, .detail-extra-info-group,
  .relatedPrdSlider, header, footer, .footerWrap, .sub-footer,
  .quick-menu, .btn-page-top, .chat-bot-area,
  div[class*="fixedBottom"], div[class*="fixed-bottom"],
  .ant-modal-root, .ant-modal-wrap, .ant-modal-mask {
    display: none !important;
  }
  body { margin: 0 !important; padding: 0 !important; overflow-x: hidden !important; }
</style>
<script>
// 3) DOM 정리: 렌더 후 불필요 요소 + 에러 모달 제거
(function() {
  var sels = [
    '.header-sub', '.main-image-wrapper', '.prdDetailMainInfoArea',
    '.topArea', '.prdOptionAreaFooter', '.detail-extra-info-group',
    '.relatedPrdSlider', 'header', 'footer', '.footerWrap',
    '.sub-footer', '.quick-menu', '.btn-page-top', '.chat-bot-area',
    '[class*="fixedBottom"]', '[class*="fixed-bottom"]',
    '.ant-modal-root', '.ant-modal-wrap', '.ant-modal-mask'
  ];
  function cleanup() {
    sels.forEach(function(s) {
      document.querySelectorAll(s).forEach(function(el) { el.remove(); });
    });
  }
  var t = setInterval(cleanup, 300);
  setTimeout(function() { clearInterval(t); }, 10000);
})();
</script>`;
    html = html.replace('</head>', injected + '</head>');

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
