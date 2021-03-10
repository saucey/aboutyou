export const getFacebookShareUrl = /* istanbul ignore next: no logic here */ () =>
  `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;

export const getPinterestShareUrl = /* istanbul ignore next: no logic here */ () =>
  `https://pinterest.com/pin/create/button/?url=${window.location.href}`;

export const getMailShareUrl = /* istanbul ignore next: no logic here */ () =>
  `mailto:info@example.com?&subject=&body=${window.location.href}`;

export const shareNatively = /* istanbul ignore next: no logic here */ () => {
  let shareTypeFix: any; // Since native sharing is not typed in typescript yet

  shareTypeFix = window.navigator;

  if (shareTypeFix.share) {
    shareTypeFix.share({
      url: window.location.href,
    });
  }
};
