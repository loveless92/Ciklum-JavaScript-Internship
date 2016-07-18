(function(n) {
    function t(t) {
        var f = n(this),
            r = null,
            u = [],
            e = null,
            o = null,
            i = n.extend({
                rowSelector: "> li",
                submenuSelector: "*",
                submenuDirection: "right",
                toleranceUp: 75,
                toleranceDown: 75,
                enter: n.noop,
                exit: n.noop,
                activate: n.noop,
                deactivate: n.noop,
                exitMenu: n.noop
            }, t),
            c = 3,
            l = 300,
            a = function(n) {
                u.push({
                    x: n.pageX,
                    y: n.pageY
                });
                u.length > c && u.shift()
            },
            v = function() {
                o && clearTimeout(o);
                i.exitMenu(this) && (r && i.deactivate(r), r = null)
            },
            y = function() {
                o && clearTimeout(o);
                i.enter(this);
                h(this)
            },
            p = function() {
                i.exit(this)
            },
            w = function() {
                s(this)
            },
            s = function(n) {
                n != r && (r && i.deactivate(r), i.activate(n), r = n)
            },
            h = function(n) {
                var t = b();
                t ? o = setTimeout(function() {
                    h(n)
                }, t) : s(n)
            },
            b = function() {
                function v(n, t) {
                    return (t.y - n.y) / (t.x - n.x)
                }
                var h, c;
                if (!r || !n(r).is(i.submenuSelector)) return 0;
                var t = f.offset(),
                    y = {
                        x: t.left,
                        y: t.top - i.toleranceUp
                    },
                    w = {
                        x: t.left + f.outerWidth(),
                        y: y.y - i.toleranceUp
                    },
                    p = {
                        x: t.left,
                        y: t.top + f.outerHeight() + i.toleranceDown
                    },
                    a = {
                        x: t.left + f.outerWidth(),
                        y: p.y + i.toleranceDown
                    },
                    s = u[u.length - 1],
                    o = u[0];
                if (!s || (o || (o = s), o.x < t.left || o.x > a.x || o.y < t.top || o.y > a.y) || e && s.x == e.x && s.y == e.y) return 0;
                h = w;
                c = a;
                i.submenuDirection == "left" ? (h = p, c = y) : i.submenuDirection == "below" ? (h = a, c = p) : i.submenuDirection == "above" && (h = y, c = w);
                var b = v(s, h),
                    k = v(s, c),
                    d = v(o, h),
                    g = v(o, c);
                return b < d && k > g ? (e = s, l) : (e = null, 0)
            };
        f.mouseleave(v).find(i.rowSelector).mouseenter(y).mouseleave(p).click(w);
        n(document).mousemove(a)
    }
    n.fn.menuAim = function(n) {
        return this.each(function() {
            t.call(this, n)
        }), this
    }
})(jQuery);
"use strict";
(function(n) {
    function t() {
        var t = this,
            o, s;
        t.shellUserDropdown = null;
        t.shellFooterDropdown = null;
        t.shellNavDropdown = null;
        t.shellNavTab = null;
        t.shellToggle = null;
        t.shellHeader = document.getElementById("shell-header");
        t.responsiveEnabled = n(".shell-responsive").length;
        t.breakpoint = 899;
        t.meControlMobileBreakpoint = 540;
        t.resizeTimeout = null;
        o = n(".shell-header-nav-toggle");
        s = n(".fixed-global-nav-buffer");
        t.resizeThrottler = function() {
            t.resizeTimeout || (t.resizeTimeout = setTimeout(function() {
                t.resizeTimeout = null;
                t.resizeHandler()
            }, 250))
        };
        t.resizeHandler = function() {
            window.msCommonShellIE8 || t.shellToggle.closeNav();
            t.shellFooterDropdown.handleFooterResize();
            t.shellNavDropdown.handleMobileDesktopViewSwitch();
            s.height(t.shellHeader.offsetHeight);
            t.shellToggle.handleSearchResize()
        };
        t.matchesSmall = function() {
            return o.is(":visible") ? !0 : t.responsiveEnabled ? !window.msCommonShellIE8 && window.matchMedia ? window.matchMedia("(max-width: " + t.breakpoint + "px)").matches : n(window).width() < t.breakpoint : !1
        };
        t.matchesLarge = function() {
            return o.is(":visible") ? !1 : t.responsiveEnabled ? !window.msCommonShellIE8 && window.matchMedia ? window.matchMedia("(min-width: " + t.breakpoint + "px)").matches : n(window).width() >= t.breakpoint : !0
        };
        t.matchesOverMeControlMobile = function() {
            return t.responsiveEnabled ? !window.msCommonShellIE8 && window.matchMedia ? window.matchMedia("(min-width: " + t.meControlMobileBreakpoint + "px)").matches : n(window).width() >= t.meControlMobileBreakpoint : !0
        };
        t.init = function() {
            n(".shell-category-header").length || n(t.shellHeader).addClass("global-sticky");
            t.shellUserDropdown = new r(t);
            t.shellFooterDropdown = new i(t);
            t.shellNavDropdown = new u(t);
            t.shellNavTab = new f(t);
            t.shellToggle = new e(t);
            n(".shell-header-dropdown-content").menuAim({
                rowSelector: "> dl",
                activate: t.shellNavTab.display,
                toleranceUp: 500,
                toleranceDown: 300,
                exitMenu: function() {
                    return !0
                }
            });
            n(window).resize(t.resizeThrottler);
            t.resizeHandler()
        };
        t.init()
    }

    function i(t) {
        var i = this,
            u = n(".grp-title"),
            r;
        i.shellUI = t;
        i.isMobileView = function() {
            return i.shellUI.matchesSmall() && !i.shellUI.matchesOverMeControlMobile()
        };
        i.toggleFooterDropDown = function(t) {
            if (i.isMobileView()) {
                i.toggle(t.target);
                var r = n(t.target).attr("aria-expanded") === "true";
                n(t.target).attr("aria-expanded", !r)
            }
        };
        i.setAccessibleAttributes = function() {
            u.attr("aria-expanded", !1).attr("role", "button").attr("tabindex", 0)
        };
        i.toggle = function(t) {
            n(t).siblings("ul").slideToggle(200)
        };
        i.init = function() {
            i.isMobileView() && (i.setAccessibleAttributes(), r = !0);
            u.on("click.shellFooterDropdown", i.toggleFooterDropDown).on("keydown", function(n) {
                n.which == 13 && i.toggleFooterDropDown(n)
            })
        };
        i.handleFooterResize = function() {
            i.shellUI.matchesOverMeControlMobile() && u.siblings("ul").css("display", "");
            i.isMobileView() && !r ? (i.setAccessibleAttributes(), r = !0) : !i.isMobileView() && r && (u.removeAttr("aria-expanded role tabindex"), r = !1)
        };
        i.init()
    }

    function r(t) {
        var i = this;
        i.shellUI = t;
        i.open = function() {
            n(".shell-header-user").addClass("active")
        };
        i.close = function() {
            n(".shell-header-user").removeClass("active")
        };
        i.toggle = function(t) {
            n(t).closest(".shell-header-user").toggleClass("active")
        };
        i.init = function() {
            n(".shell-header-user-label a").on("click.shellUserDropdown", function() {
                return i.toggle(this), !1
            });
            n(document).on("click.shellUserDropdownOutside", function(t) {
                n(t.target).closest(".shell-header-user").length || i.close()
            });
            n(document).on("keyup.shellUserDropdownOutside", function(n) {
                n.keyCode == 27 && i.close()
            })
        };
        i.init()
    }

    function u(t) {
        var i = this,
            u = n(".shell-header"),
            e = n(".shell-header-dropdown"),
            h = n(".shell-header-dropdown-tab"),
            o = n(".shell-header-dropdown-content"),
            c = n(".shell-header-dropdown-tab-content"),
            s = n(".shell-header-nav-wrapper"),
            l = n(".shell-header-nav-toggle"),
            f = n(document.getElementById("meControl")),
            v = n(".shell-header-user dt"),
            y = n(".shell-header-user-mobile-container"),
            p = n(".c-nav-pagination"),
            a = 40,
            r = 200;
        i.shellUI = t;
        i.open = function(t) {
            var f;
            if (t.addClass("active"), f = t.find(".shell-header-dropdown-content"), i.shellUI.matchesLarge())
                if (t.hasClass("horizontalLayout")) {
                    var o = t.data("navcontainer"),
                        e = n("#" + o),
                        s = e.siblings(".shell-header-HL2");
                    e.hasClass("active") || (s.removeClass("active"), e.addClass("active"))
                } else u.hasClass("mobile-view") || f.slideDown(r).promise().done(function() {
                    i.offset(t);
                    f.css("overflow", "")
                });
            else f.slideDown(r, function() {
                f.css("overflow", "")
            })
        };
        i.offset = function(t) {
            var f = t.closest(".shell-header-wrapper"),
                r = t.find(".shell-header-dropdown-content"),
                s = "left",
                i = 0,
                u = 0,
                e, o;
            n("body").css("direction") === "rtl" ? (s = "right", i = t.offset().left + t.outerWidth() - (f.offset().left + r.outerWidth()), e = t.offset().left + t.outerWidth() - i, u = n("body").width() - e - (e - r.outerWidth())) : (i = f.offset().left + f.outerWidth() - (t.offset().left + r.outerWidth()), o = t.offset().left + i, u = o - (n("body").width() - o - r.outerWidth()));
            u < 0 && (i -= u / 2);
            r.css(s, i < 0 ? i : "")
        };
        i.adjustMenuPaneSize = function(t, i) {
            if (this.shellUI.matchesSmall()) n(i[0]).attr("style", "");
            else {
                i.height("auto");
                var r = t.children(".shell-header-dropdown-tab-content");
                r && (r.height() > i.height() ? i.height(r.height() - a) : r.height(i.height() + 8))
            }
        };
        i.handleMobileDesktopViewSwitch = function() {
            i.shellUI.matchesLarge() ? u.hasClass("mobile-view") && (u.removeClass("mobile-view"), e.removeClass("active"), h.removeClass("active"), o.removeAttr("style"), c.removeAttr("style"), s.removeClass("opened"), s.removeAttr("style"), l.removeClass("opened"), n("html").css("overflow", "auto")) : (u.hasClass("mobile-view") || (u.addClass("mobile-view"), e.removeClass("active"), h.removeClass("active"), o.removeAttr("style"), c.removeAttr("style")), p.hide());
            i.shellUI.matchesOverMeControlMobile() ? v.find("#meControl").length || (f.detach(), v.append(f), window.MSA && window.MSA.MeControl && (i.shellUI.matchesLarge() ? window.MSA.MeControl.API.setMobileState(0) : window.MSA.MeControl.API.setMobileState(1))) : y.find("#meControl").length || (f.detach(), y.append(f), window.MSA && window.MSA.MeControl && window.MSA.MeControl.API.setMobileState(2), e.length || f.length || l.css("display", "none"))
        };
        i.closed = function() {
            i.shellUI.matchesLarge() && n(".shell-header-dropdown-content").height("auto")
        };
        i.close = function(n) {
            n.removeClass("active");
            n.find(".shell-header-dropdown-content").slideUp(r, i.closed);
            n.find(".shell-header-dropdown-tab").removeClass("active")
        };
        i.closeAll = function() {
            var u = n(document.activeElement).closest(".shell-header-dropdown"),
                t;
            n(".shell-header-dropdown").removeClass("active");
            o.slideUp(r, i.closed);
            h.removeClass("active");
            i.shellUI.matchesSmall() && (e.removeClass("active"), o.removeAttr("style"), c.removeAttr("style"), s.removeClass("opened"), s.hide(), l.removeClass("opened"), n("html").css("overflow", "auto"));
            t = n(".shell-header-dropdown");
            i.CloseAriaAttributes(t.find(".shell-header-dropdown-label > a[aria-expanded]"), "aria-expanded");
            i.CloseAriaAttributes(t.find(".shell-header-dropdown-content"), "aria-hidden");
            u.length && u.find(".shell-header-dropdown-label").find("a").first().focus()
        };
        i.toggleAriaAttributes = function(n, t) {
            n && n.length && (n.attr(t) === "false" ? n.attr(t, "true") : n.attr(t, "false"))
        };
        i.CloseAriaAttributes = function(n, t) {
            n && n.length && (t === "aria-expanded" ? n.attr(t, "false") : n.attr(t, "true"))
        };
        i.toggle = function(t) {
            var u = n(t).closest(".shell-header-dropdown"),
                f = u.siblings(".shell-header-dropdown"),
                e, o;
            u.length && (u.hasClass("active") ? i.close(u) : (f.removeClass("active"), f.find(".shell-header-dropdown-content").slideUp(r, i.closed), i.open(u)));
            e = u.find(".shell-header-dropdown-label > a[aria-expanded]");
            o = u.find(".shell-header-dropdown-content");
            i.toggleAriaAttributes(e, "aria-expanded");
            i.toggleAriaAttributes(o, "aria-hidden")
        };
        i.SelectUp = function() {
            var r = n(document.activeElement),
                e = !1,
                u, c, o, t, s, f, h, l;
            return r.hasClass("shell-l3-list-item") ? (u = r.parent(), c = u.prev(), c.length && (t = u.prev().find("a").first(), t.length ? (u.removeClass("shell-header-dropdown-tab-list-active"), t.focus(), u.prev().addClass("shell-header-dropdown-tab-list-active")) : (o = u.closest(".shell-l3-group"), o.length && (t = o.prev().find("a").last(), t.length && (u.removeClass("shell-header-dropdown-tab-list-active"), t.focus(), t.parent().addClass("shell-header-dropdown-tab-list-active"))))), e = !0) : r.closest(".shell-header-dropdown-tab").length && (s = r.parent().parent(), f = s.prev(), f.length == 0 && (i.close(r.closest(".shell-header-dropdown")), h = r.closest(".shell-header-dropdown"), i.CloseAriaAttributes(h.find(".shell-header-dropdown-label > a[aria-expanded]"), "aria-expanded"), i.CloseAriaAttributes(h.find(".shell-header-dropdown-content"), "aria-hidden")), s.removeClass("active"), f.length ? (f.addClass("active"), f.find("a").first().focus()) : (l = r.closest(".shell-header-dropdown"), l.find(".shell-header-dropdown-label").find("a").first().focus()), e = !0), e
        };
        i.SelectUpMobile = function() {
            var t = n(document.activeElement),
                u = !1,
                f, r, e;
            return t.parent().hasClass("shell-header-dropdown-label") ? (f = t.closest(".shell-header-dropdown").prev(), f.length && !f.hasClass("shell-header-user-mobile-container") ? f.find("a").first().focus() : (i.shellUI.shellToggle.toggleHeaderNav(), n(".shell-header-toggle-menu").focus()), u = !0) : t.parent().hasClass("shell-header-dropdown-tab-label") ? (t.closest(".shell-header-dropdown-tab-label").removeClass("shell-header-dropdown-tab-label-mobile-focus"), r = t.closest(".shell-header-dropdown-tab").prev(), r.length ? (r.find("a").first().focus(), r.find(".shell-header-dropdown-tab-label").addClass("shell-header-dropdown-tab-label-mobile-focus")) : (i.shellUI.shellNavDropdown.close(t.closest(".shell-header-dropdown")), t.closest(".shell-header-dropdown").find("a").first().focus()), u = !0) : t.hasClass("shell-l3-list-item") && (r = t.parent().prev().find("a").first().focus(), r.length == 0 && (e = t.closest(".shell-header-dropdown-tab"), i.shellUI.shellNavTab.toggle(e.find("a").first()), e.find("a").first().focus()), u = !0), u
        };
        i.SelectDown = function() {
            var t = n(document.activeElement),
                e = !1,
                u, c, f, o, l, s, a, h;
            return t.parent().hasClass("shell-header-dropdown-label") ? (u = t.closest(".shell-header-dropdown"), c = u.siblings(".shell-header-dropdown"), u.length && (c.removeClass("active"), c.find(".shell-header-dropdown-content").slideUp(r, i.closed), i.open(u), setTimeout(function() {
                t.parents("li").find(".shell-header-dropdown-tab").find("a").first().focus()
            }, 300), e = !0, i.toggleAriaAttributes(u.find(".shell-header-dropdown-label > a[aria-expanded]"), "aria-expanded"), i.toggleAriaAttributes(u.find(".shell-header-dropdown-content"), "aria-hidden"))) : t.hasClass("shell-l3-list-item") ? (f = t.parent(), o = f.next(), o.length ? (f.removeClass("shell-header-dropdown-tab-list-active"), o.find("a").first().focus(), o.addClass("shell-header-dropdown-tab-list-active")) : (l = f.closest(".shell-l3-group"), l.length && (s = l.next().find("a").first(), s.length && (f.removeClass("shell-header-dropdown-tab-list-active"), s.focus(), s.parent().addClass("shell-header-dropdown-tab-list-active")))), e = !0) : t.closest(".shell-header-dropdown-tab").length && (a = t.parent().parent(), h = a.next(), h.length && (a.removeClass("active"), h.addClass("active"), h.find("a").first().focus()), e = !0), e
        };
        i.SelectDownMobile = function() {
            var t = n(document.activeElement),
                f = !1,
                u, r, e, o;
            return t.hasClass("shell-header-toggle-menu") ? (t.parent().hasClass("opened") ? t.closest(".shell-header-top").find(".shell-header-dropdown-label").first().find("a").first().focus() : (i.shellUI.shellToggle.toggleHeaderNav(), n(".shell-header-nav-wrapper").hasClass("opened") && n("#srv_shellHeaderNav").find(".shell-header-dropdown").first().find("a").first().focus()), f = !0) : t.parent().hasClass("shell-header-dropdown-label") ? (r = t.closest(".shell-header-dropdown"), r.hasClass("active") ? r.find(".shell-header-dropdown-tab-label").first().find("a").focus().addClass("shell-header-dropdown-tab-label-mobile-focus") : t.closest(".shell-header-dropdown").next().find("a").first().focus(), f = !0) : t.parent().hasClass("shell-header-dropdown-tab-label") ? (r = t.closest(".shell-header-dropdown-tab"), r.hasClass("active") ? r.find(".shell-l3-list-item").first().focus() : (n(".shell-header-dropdown-tab-label-mobile-focus").removeClass("shell-header-dropdown-tab-label-mobile-focus"), u = t.closest(".shell-header-dropdown-tab").next(), u.length ? (u.find("a").first().focus(), u.find(".shell-header-dropdown-tab-label").addClass("shell-header-dropdown-tab-label-mobile-focus")) : (u = t.closest(".shell-header-dropdown").next().find("a").first().focus(), u.length && i.shellUI.shellNavDropdown.close(t.closest(".shell-header-dropdown")))), f = !0) : t.hasClass("shell-l3-list-item") && (u = t.parent().next().find("a").first().focus(), u.length == 0 && (r = t.closest(".shell-header-dropdown-tab"), e = r.next(), e.length && (i.shellUI.shellNavTab.toggle(r.find("a").first()), o = e.find("a").first().focus(), n(".shell-header-dropdown-tab-label-mobile-focus").removeClass("shell-header-dropdown-tab-label-mobile-focus"), o.parent().addClass("shell-header-dropdown-tab-label-mobile-focus"))), f = !0), f
        };
        i.SelectRight = function() {
            var t = n(document.activeElement),
                u = !1,
                r, f, i;
            return t.parent().hasClass("shell-header-dropdown-tab-label") ? (r = t.parent().parent(), f = r.find("li a").first(), f.focus(), r.find(".shell-l3-group").length == 0 ? r.find("li").first().addClass("shell-header-dropdown-tab-list-active") : f.parent().addClass("shell-header-dropdown-tab-list-active"), u = !0) : t.parent().hasClass("shell-header-dropdown-label") && (i = t.closest(".shell-header-dropdown").next(), i.length ? i.hasClass("shell-header-dropdown-label") ? i.find("a").first().focus() : i.find(".shell-header-dropdown-label").find("a").first().focus() : t.closest(".shell-header-dropdown-label").next().find("a").first().focus(), u = !0), u
        };
        i.SelectLeft = function() {
            var t = n(document.activeElement),
                r = !1,
                u, f, i;
            return t.parent().hasClass("shell-header-dropdown-tab-list-active") ? (u = t.parent(), f = u.closest(".shell-header-dropdown-tab"), u.removeClass("shell-header-dropdown-tab-list-active"), f.addClass("active"), f.find("a").first().focus(), r = !0) : t.parent().hasClass("shell-header-dropdown-label") && (i = t.closest(".shell-header-dropdown").prev(), i.length ? i.hasClass("shell-header-dropdown-label") ? i.find("a").first().focus() : i.find(".shell-header-dropdown-label").find("a").first().focus() : t.closest(".shell-header-dropdown-label").prev().find("a").first().focus(), r = !0), r
        };
        i.init = function() {
            n(".shell-header-dropdown-label a:not(.shell-header-direct-link)").click(function() {
                i.toggle(this)
            });
            n(document).on("click.shellNavDropdownOutside", function(t) {
                n(t.target).closest(".shell-header-nav").length || n(t.target).closest(".shell-header-nav-toggle").length || i.closeAll()
            });
            n(document).on("keyup.shellNavDropdownOutside", function(n) {
                n.keyCode == 27 && i.closeAll()
            });
            n(document).on("keydown.shellNavDropdownOutside", function(t) {
                var r = n(".shell-header").hasClass("mobile-view"),
                    u;
                return t.keyCode == 40 ? r ? !i.SelectDownMobile() : !i.SelectDown() : t.keyCode == 38 ? r ? !i.SelectUpMobile() : !i.SelectUp() : (u = n("body").css("direction") === "rtl", t.keyCode == 39) ? u ? r ? !0 : !i.SelectLeft() : r ? !0 : !i.SelectRight() : t.keyCode == 37 ? u ? r ? !0 : !i.SelectRight() : r ? !0 : !i.SelectLeft() : void 0
            });
            var t = n.fn.jquery.split(".");
            a = parseInt(t[0]) < 2 && parseInt(t[1]) <= 7 ? 0 : 8
        };
        i.init()
    }

    function f(t) {
        var i = this;
        i.shellUI = t;
        i.display = function(r) {
            var u, e, f;
            i.shellUI.matchesLarge() && (u = n(r).closest(".shell-header-dropdown-tab"), e = u.siblings(".shell-header-dropdown-tab"), u.hasClass("active") || (e.removeClass("active"), u.addClass("active")), f = u.closest(".shell-header-dropdown-content"), t.shellNavDropdown.adjustMenuPaneSize(u, f), u.find(".shell-header-dropdown-tab-content").length ? (f.removeClass("shell-header-dropdown-content-notab"), i.displayImg(u)) : f.hasClass("shell-header-dropdown-content-notab") || f.addClass("shell-header-dropdown-content-notab"))
        };
        i.displayImg = function(t) {
            t.find("img[data-src]").attr("src", function() {
                return n(this).attr("data-src")
            }).removeAttr("data-src")
        };
        i.toggle = function(t) {
            var r = n(t).closest(".shell-header-dropdown-tab"),
                u = r.siblings(".shell-header-dropdown-tab"),
                f = 200,
                e = r.find(".shell-header-dropdown-tab-content"),
                o = u.find(".shell-header-dropdown-tab-content");
            o.slideUp(f, i.closed);
            e.slideToggle(f).promise().done(function() {
                this.is(":hidden") ? r.removeClass("active") : (r.addClass("active"), u.removeClass("active"))
            })
        };
        i.displayFirst = function(n) {
            i.display(n.find(".shell-header-dropdown-tab:first-child .shell-header-dropdown-tab-label a"))
        };
        i.init = function() {
            n(".shell-header-dropdown-tab-label a").on("click.shellNavTab", function() {
                var t = n(this).closest(".shell-header-dropdown-tab-label");
                return !t.hasClass("shell-header-L2menu-direct-link") && !t.hasClass("shell-header-L2menu-direct-link-withL3") ? (i.shellUI.matchesSmall() && i.toggle(this), !1) : !0
            });
            n(".shell-header-dropdown-tab-label").on("click.shellNavTab", function() {
                return n(this).hasClass("shell-header-L2menu-direct-link-withL3") && i.shellUI.matchesSmall() && i.toggle(this), !0
            });
            n(".shell-header-dropdown-tab-label>a").on("focus", function() {
                return i.display(this), !0
            })
        };
        i.init()
    }

    function e(t) {
        var r = this,
            i = n(".shell-header-nav-wrapper"),
            e = n(".shell-header-nav-toggle"),
            o = n(".shell-header-wrapper"),
            s = n(".shell-header-actions"),
            h = n(".shell-header-toggle"),
            u = n(".shell-header-top"),
            f = n(".shell-header-user-container");
        r.shellUI = t;
        r.init = function() {
            n(".shell-header-toggle-search").on("click.shellToggle", function() {
                var t = n(".shell-search");
                n(this).toggleClass("active");
                t.toggleClass("expanded");
                t.hasClass("expanded") ? (t.find('input[type="search"]').focus(), o.css("height", "auto")) : o.css("height", "")
            });
            n(".shell-header-toggle-menu").on("click.shellToggle", function() {
                r.toggleHeaderNav()
            });
            n(document).on("keydown", function(n) {
                var t = n.keyCode || n.width;
                t === 27 && r.closeNav()
            })
        };
        r.handleSearchResize = function() {
            if (r.shellUI.matchesLarge()) {
                var e = i.outerWidth(!0) + i.offset().left + 40,
                    o = i.offset().left,
                    t = n("body").css("direction") === "rtl";
                !t && e > s.offset().left && h.offset().left - e < 250 || t && f.length && o - f.offset().left - f.outerWidth() < 334 || t && !f.length && o - u.offset().left < 334 ? u.hasClass("collapse-search") || u.addClass("collapse-search") : u.hasClass("collapse-search") && u.removeClass("collapse-search")
            }
        };
        r.closeNav = function() {
            i.hasClass("opened") && (i.removeClass("opened"), i.hide(), e.removeClass("opened"), n("html").css("overflow") === "hidden" && n("html").css("overflow", "auto"))
        };
        r.toggleHeaderNav = function() {
            var t;
            i.hasClass("opened") || (t = r.shellUI.shellHeader.offsetHeight, i.css("height", "calc(100% - " + t + "px)"), i.show(), n(".shell-header-dropdown-tab-label-mobile-focus").removeClass("shell-header-dropdown-tab-label-mobile-focus"));
            i.toggleClass("opened").promise().done(function() {
                i.hasClass("opened") || setTimeout(function() {
                    i.hide()
                }, 300)
            });
            e.toggleClass("opened");
            var u = window.pageXOffset !== undefined,
                f = (document.compatMode || "") === "CSS1Compat",
                o = u ? window.pageYOffset : f ? document.documentElement.scrollTop : document.body.scrollTop;
            o > 0 && n("html,body").animate({
                scrollTop: 0
            }, 100);
            i.hasClass("opened") ? n("html").css("overflow", "hidden") : n("html").css("overflow", "auto")
        };
        r.init()
    }
    n(function() {
        window.shellUI = new t
    })
})(jQuery);
Date.now || (Date.now = function() {
    return (new Date).getTime()
}),
    function() {
        for (var r = ["webkit", "moz"], t, i, n = 0; n < r.length && !window.requestAnimationFrame; ++n) t = r[n], window.requestAnimationFrame = window[t + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t + "CancelAnimationFrame"] || window[t + "CancelRequestAnimationFrame"];
        !/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) && window.requestAnimationFrame && window.cancelAnimationFrame || (i = 0, window.requestAnimationFrame = function(n) {
            var t = Date.now(),
                r = Math.max(i + 16, t);
            return setTimeout(function() {
                n(i = r)
            }, r - t)
        }, window.cancelAnimationFrame = clearTimeout)
    }(),
    function(n, t) {
        var i = n.jQuery || n.Cowboy || (n.Cowboy = {}),
            r;
        i.throttle = r = function(n, r, u, f) {
            function s() {
                function i() {
                    o = +new Date;
                    u.apply(h, c)
                }

                function l() {
                    e = t
                }
                var h = this,
                    s = +new Date - o,
                    c = arguments;
                f && !e && i();
                e && clearTimeout(e);
                f === t && s > n ? i() : r !== !0 && (e = setTimeout(f ? l : i, f === t ? n - s : n))
            }
            var e, o = 0;
            return typeof r != "boolean" && (f = u, u = r, r = t), i.guid && (s.guid = u.guid = u.guid || i.guid++), s
        };
        i.debounce = function(n, i, u) {
            return u === t ? r(n, i, !1) : r(n, u, i !== !1)
        }
    }(this);
var categoryHeader = function(n) {
    var ut = [],
        r, l, a, p, w, b, ft, et, ot, st, ht, c = 200,
        k, i = !1,
        u, d = 41,
        g = n.fn.jquery.split(".");
    k = parseInt(g[0]) < 2 && parseInt(g[1]) < 8 ? 0 : 8;
    n.fn.setAllToMaxHeight = function() {
        return this.height(Math.max.apply(this, n.map(this, function(t) {
            return n(t).height()
        })))
    };
    var ct = function(t, r) {
            var u, e, l, h, y, p, c;
            if (r.height("auto"), u = t.children(".c-nav-dropdown-tab-content"), e = n(window).width(), i = !1, u && u.length) {
                l = function() {
                    u.css({
                        width: "",
                        left: "",
                        right: "",
                        height: ""
                    })
                };
                l();
                var a = u.width(),
                    w = -(e - (u.offset().left + u.width())),
                    f = 201,
                    s = function() {
                        u.height() > r.height() ? r.height(u.height() - k) : u.height(r.height() + 8)
                    },
                    o = function() {
                        var n = u.width();
                        n > f * 2 ? u.find(".shell-c3-group").setAllToMaxHeight() : u.find(".shell-c3-group").css("height", "");
                        n > f * 3 && n < f * 4 && u.width(f * 3);
                        n > f * 2 && n < f * 3 && u.width(f * 2)
                    },
                    v = function(r) {
                        var h = t.outerWidth(),
                            f, s;
                        if (r === !0) f = function() {
                            u.css({
                                right: "auto",
                                left: h
                            })
                        }, f(), i = !0, s = function() {
                            var n = e - (u.offset().left + u.width());
                            u.width(u.width() + n).promise().done(function() {
                                o()
                            })
                        }, u.offset().left + u.width() > n(".shell-category-header").width() && (s(), f());
                        else {
                            var c = u.width() + (u.offset().left - u.width() - t.width()),
                                f = function() {
                                    u.css({
                                        left: "auto",
                                        right: h
                                    })
                                },
                                s = function() {
                                    u.width(c).promise().done(function() {
                                        o()
                                    })
                                };
                            u.offset().left - u.width() - t.width() < 0 ? n.when(s()).done(function() {
                                f()
                            }) : (f(), i = !0)
                        }
                    };
                n("body").css("direction") === "rtl" ? (h = u.offset().left < 0, y = u.offset().left + u.width() + t.width() > e - f, h && !y ? v(!0) : h && (u.width(u.width() + u.offset().left).promise().done(function() {
                    o()
                }), s())) : (p = u.offset().left - u.width() - t.width() > -f, c = u.offset().left + u.width() > e, c && p ? v() : c && (a = u.width(), u.width(a - w).promise().done(function() {
                    o()
                }), s()));
                s()
            }
        },
        o = function(n, t) {
            n.length && n.hasClass("c3-nav-dropdown-tab-content") && (t ? n.addClass("active") : n.removeClass("active"))
        },
        s = function(t) {
            var i = n(t),
                r = i.siblings("li"),
                u = i.siblings().find("div"),
                f = i.children("div");
            o(f, !0);
            u.removeClass("active");
            r.removeClass("active");
            i.addClass("active");
            ct(i, i.parent(".c-nav-dropdown-menu"))
        },
        nt = function(n, t) {
            n && n.length && (n.attr(t) === "false" ? n.attr(t, "true") : n.attr(t, "false"))
        },
        tt = function(n, t) {
            n && n.length && (t === "aria-expanded" ? n.attr(t, "false") : n.attr(t, "true"))
        },
        lt = function() {
            n(".shell-category-nav-wrapper .c-nav-dropdown-menu").menuAim({
                rowSelector: "> li",
                activate: s,
                toleranceUp: 500,
                toleranceDown: 300,
                exitMenu: function() {
                    return !0
                }
            });
            l.on("click", function() {
                h(n(this))
            });
            n(".c-logo-mobile.c-top-nav-link").on("click", function() {
                r.toggleClass("mobile-dropdown-active")
            });
            a.on("click", function() {
                e(this)
            });
            a.on("keypress", function() {
                event.keyCode === 32 && (e(this), n(this).hasClass("active") ? n(this).removeClass("active") : n(this).addClass("active"), event.preventDefault())
            });
            n(document).on("click", function(t) {
                n(t.target).closest(".shell-category-top-level").length || f()
            });
            n(document).on("keyup", function(n) {
                n.keyCode == 27 && f()
            });
            n(document).on("keydown", function(t) {
                if (u = n(".shell-header").hasClass("mobile-view"), t.keyCode == 40) return u ? !pt() : !yt();
                if (t.keyCode == 38) return u ? !vt() : !at();
                if (!u) {
                    var i = n("body").css("direction") === "rtl";
                    if (t.keyCode == 39) return i ? !y() : !v();
                    if (t.keyCode == 37) return i ? !v() : !y()
                }
            });
            n(window).resize(n.throttle(100, rt))
        },
        h = function(t) {
            var i = t.parent().siblings().children(".active"),
                r;
            if (u = n(".shell-header").hasClass("mobile-view"), t.hasClass("active")) t.removeClass("active");
            else if (t.closest(".active").length > 0 || i.length < 0) t.addClass("active");
            else {
                if (r = n(".c-logo-item").find(".menu-logo-top-level"), r.length && !u) {
                    var f = r.children(),
                        e = f.children("ul"),
                        o = f.children("a");
                    o.hasClass("active") && (e.length && e.slideUp(c), o.removeClass("active"))
                }
                u || (i = n(".c-menu-container li > a[class*='active']"));
                i.length && (i.siblings(".c-nav-dropdown-menu").length && i.siblings(".c-nav-dropdown-menu").slideUp(c, function() {
                    t.css("height", "")
                }), i.removeClass("active"));
                t.addClass("active")
            }
            nt(t, "aria-expanded");
            nt(t.siblings(".c-nav-dropdown-menu"), "aria-hidden")
        },
        at = function() {
            var t = n(document.activeElement),
                h = !1,
                l, u, f;
            if (t.hasClass("c-nav-dropdown-item")) {
                var c = t.parent(),
                    r = c.prev(),
                    a = c.children("div");
                o(a, !1);
                r.length ? (r.find("a").first().focus(), r.parent().find(".c-nav-dropdown-tab-content").length ? s(r) : (l = r.find(".c3-nav-dropdown-tab-content"), o(l, !0))) : (u = t.closest(".c-top-nav-item").find(".c-nav-dropdown"), u.removeClass("active"), e(u), u.focus());
                h = !0
            } else t.closest(".c-nav-dropdown-tab-content").length && (f = t.closest("li").prev(), f.length && f.find("a").length ? f.find("a").first().focus() : i ? t.closest(".c-nav-dropdown-tab-list").next().find("a").last().focus() : t.closest(".c-nav-dropdown-tab-list").prev().find("a").last().focus(), h = !0);
            return h
        },
        vt = function() {
            var t = n(document.activeElement),
                o = !1,
                f, i, r, u, s;
            return (t.hasClass("c-top-nav-link") || t.hasClass("c-nav-link")) && (f = t.closest(".c-top-nav-item, .c-nav-item").prev(), f.length ? f.find("a").first().focus() : t.hasClass("c-top-nav-link") ? (i = t.parent().parent(), i.length && i.hasClass("c-nav-dropdown-menu") ? (r = i.siblings(".c-top-nav-link"), h(r), e(r), r.focus()) : (u = n(".c-logo-mobile.c-top-nav-link.c-nav-dropdown"), h(u), e(u), u.focus())) : (s = t.closest(".c-nav-dropdown-menu").closest(".c-top-nav-item, .c-nav-item").find("a").first(), s.focus()), o = !0), o
        },
        yt = function() {
            var t = n(document.activeElement),
                u = !1,
                f, c, r, a, p, l;
            return t.hasClass("c-nav-dropdown") ? (t.hasClass("active") ? (f = t.closest(".c-top-nav-item"), f.find("li").first().hasClass("c-nav-item") ? f.find(".c-nav-dropdown-item").first().focus() : (c = f.find(".c-nav-item-with-dropdown").first().next().find(".c-nav-dropdown-item"), c.length && (c.first().focus(), s(c.parent())))) : (h(t), e(t), t.closest(".c-top-nav-item").find(".c-nav-dropdown-item").first().focus()), u = !0) : t.hasClass("c-nav-dropdown-item") ? (r = t.parent().next(), r.length && (r.find(".c-nav-dropdown-item").first().focus(), r.parent().find(".c-nav-dropdown-tab-content").length ? s(r) : (a = t.siblings(), o(a, !1), p = r.children(".c3-nav-dropdown-tab-content"), o(p, !0))), u = !0) : t.closest(".c-nav-dropdown-tab-content").length && (l = t.closest("li").next(), l.length ? l.find("a").first().focus() : i ? y() : v(), u = !0), u
        },
        pt = function() {
            var t = n(document.activeElement),
                i = !1,
                r, u;
            return t.hasClass("c-logo-mobile") && t.hasClass("c-top-nav-link") && t.hasClass("c-nav-dropdown") ? (t.hasClass("active") ? (r = t.siblings(".menu-logo-dropdown-mobile"), r.length ? r.find(".c-top-nav-link").first().focus() : t.closest(".shell-category-top-level").find(".c-nav-dropdown-menu").find("a").first().focus()) : (h(t), e(t), n(".c-nav-dropdown-menu").find("a").first().focus()), i = !0) : (t.hasClass("c-top-nav-link") || t.hasClass("c-nav-link")) && (t.hasClass("c-top-nav-link") && t.hasClass("active") ? t.hasClass("c-nav-dropdown-item") ? t.parent().find(".c-nav-dropdown-menu").first().find(".c-nav-dropdown-item").first().focus() : t.closest(".c-top-nav-item").find(".c-nav-dropdown-menu").first().find(".c-nav-link").first().focus() : (u = t.closest(".c-top-nav-item, .c-nav-item").next(), u.length ? u.find("a").first().focus() : (!t.hasClass("c-top-nav-link") || t.hasClass("c-nav-dropdown-item")) && t.closest(".c-top-nav-item").next().find("a").first().focus()), i = !0), i
        },
        v = function() {
            var r = n(document.activeElement),
                f = !1,
                e, s, u;
            if (r.hasClass("menu-logo") && (e = n(".shell-category-nav").find(".c-menu-container"), e.length && e.children().first().find("a[class*='c-top-nav-link']").focus()), r.hasClass("c-top-nav-link")) s = r.closest(".c-top-nav-item").next(), s.find(".c-top-nav-link").focus(), s.hasClass("c-top-nav-disabled") && (t.navSlide.navScrollNext(), t.navSlide.state.navNext.hide());
            else if (r.hasClass("c-nav-dropdown-item")) {
                if (i) u = r.closest(".c-nav-item-with-dropdown"), u.length && u.find("a").first().focus();
                else {
                    var h = r.parent(),
                        c = h.find("li a"),
                        l = h.children("div");
                    o(l, !0);
                    c.first().focus()
                }
                f = !0
            } else r.closest(".c-nav-dropdown-tab-content").length && (u = r.closest(".c-nav-dropdown-tab-list").next(), u.length ? u.find("a").first().focus() : i && r.closest(".c-nav-item-with-dropdown").find("a").first().focus(), f = !0);
            return f
        },
        y = function() {
            var r = n(document.activeElement),
                f = !1,
                u, e, o, c, l, s, h;
            return r.hasClass("c-top-nav-link") ? (u = r.closest(".c-top-nav-item").prev(), u.find(".c-top-nav-link").focus(), u.hasClass("c-top-nav-disabled") && (t.navSlide.navScrollPrev(), t.navSlide.state.navNext.show()), u.length || (e = n(".c-logo-item .menu-logo-top-level").find(".menu-logo"), e.length && e.focus())) : r.closest(".c-nav-dropdown-tab-content").length ? (o = r.closest(".c-nav-dropdown-tab-list").prev(), o.length ? o.find("a").first().focus() : i || (c = r.parent().find("div"), c.length ? (l = r.closest(".c-nav-dropdown-tab-content"), l.closest(".c-nav-item-with-dropdown").find("a").first().focus()) : r.closest(".c-nav-item-with-dropdown").find("a").first().focus()), f = !0) : r.hasClass("c-nav-dropdown-item") && (i && (s = r.parent(), h = s.find(".c-nav-dropdown-tab-list").last().find("li a"), h.length ? h.first().focus() : s.find(".c-nav-dropdown-tab-content").find(".c-nav-dropdown-item").first().focus()), f = !0), f
        },
        wt = function() {
            r = n(".shell-category-header");
            l = n(".c-top-nav-link");
            a = n(".c-nav-dropdown");
            p = n(".shell-category-nav");
            b = n(".shell-category-brand");
            w = n(".shell-category-nav-wrapper");
            ft = n(".shell-category-header-cta-wrapper");
            ot = p.width();
            st = w.outerWidth();
            et = b.innerWidth();
            ht = window.innerWidth || document.documentElement.clientWidth;
            bt()
        },
        bt = function() {
            n(".shell-category-nav-wrapper > .c-top-nav-item").each(function() {
                ut.push(n(this).outerWidth())
            })
        },
        f = function() {
            var t = n(".active"),
                i = n(document.activeElement).closest(".c-top-nav-item"),
                u, f;
            tt(t.parent().siblings("a[aria-expanded]"), "aria-expanded");
            tt(t.parent("ul[aria-hidden]"), "aria-hidden");
            t.siblings(".c-nav-dropdown-menu").slideUp(c, function() {
                n(this).css("height", "")
            });
            l.removeClass("active");
            r.removeClass("mobile-dropdown-active");
            n(".c-nav-dropdown-tab-content").css("left", "");
            n(".c-nav-dropdown-tab-content").css("right", "");
            t.hasClass("menu-logo") && (u = t.siblings(".menu-logo-wrapper"), f = u.find(".active"), f.removeClass("active"));
            i.length && i.find(".c-top-nav-link").first().focus()
        },
        e = function(t) {
            if (!n(t).parent().hasClass("c-top-nav-disabled")) {
                var h = window.innerWidth || document.documentElement.clientWidth,
                    i = n(t).siblings(".c-nav-dropdown-menu"),
                    f = i.outerWidth() - n(t).outerWidth(),
                    r, e = i.find(".c-nav-multicolumn"),
                    o = e.parent(".current"),
                    u;
                u = o.length ? o : e.parent(".c-nav-item-with-dropdown").first();
                n(".c-logo-mobile").css("display") === "none" && (n("body").css("direction") === "rtl" ? (r = n(t).offset().left - i.outerWidth(), r < 0 ? i.css("margin-right", -f) : i.css("margin-right", "")) : (r = n(t).offset().left + i.outerWidth(), r > h ? i.css("margin-left", -f) : i.css("margin-left", "")));
                u.length ? i.slideToggle(0).promise().done(function() {
                    n(t).hasClass("active") && s(u)
                }) : i.slideToggle(c)
            }
        },
        kt = function() {
            n(".c-logo-mobile").css("display") === "none" ? r.hasClass("mobile-view") && (r.removeClass("mobile-view"), n(".c-logo-mobile").siblings(".c-nav-dropdown-menu").removeAttr("style"), f()) : r.hasClass("mobile-view") || (r.addClass("mobile-view"), f())
        },
        it = function(t) {
            return n(window).width() - (t.offset().left + t.outerWidth())
        },
        rt = function() {
            kt()
        },
        t = t || {};
    return t.state = t.state || {
            mobile: function() {
                return n(".shell-category-header").hasClass("mobile-view")
            }
        }, t.navSlide = t.navSlide || {
            getState: function() {
                var t = {},
                    i = 17,
                    r;
                return t.nav = n(".shell-category-nav-wrapper"), t.navItems = n(".shell-category-nav-wrapper > li"), t.navContainer = n(".shell-category-nav"), t.navContainerOffset = t.navContainer.offset().left, t.cta = n(".shell-category-header-cta-wrapper"), t.firstNav = t.nav.children("li:first-child"), t.lastNav = t.nav.children("li:last-child"), t.lastNavPos = t.lastNav.find("span").first().innerWidth() + t.lastNav.find("span").first().offset().left, t.navNext = n(".c-nav-pagination-next"), t.navNextOffset = t.navNext.offset().left, t.navPrev = n(".c-nav-pagination-prev"), t.disabledMenu = n(".c-top-nav-disabled"), t.navWidth = t.nav.outerWidth(), t.navContainerWidth = parseFloat(t.navContainer.css("width")), t.navContainerOuterWidth = n(".shell-category-nav").outerWidth(), t.logoWidth = parseFloat(n(".shell-category-brand").css("width")), t.wrapWidth = t.navContainerWidth - t.logoWidth, n("body").css("direction") === "rtl" ? (t.isRTL = !0, t.scrollDirection = "right", t.scrollOppositeDirection = "left", t.endPoint = t.navNext.position().left + t.navNext.outerWidth() - t.lastNav.position().left + i, t.navPosPrevLeft = t.navPrev.offset().left, t.navPosLeft = t.navNext.offset().left + t.navNext.outerWidth()) : (t.isRTL = !1, t.scrollDirection = "left", t.scrollOppositeDirection = "right", t.endPoint = t.lastNav.outerWidth() + t.lastNav.position().left + i, t.navPosLeft = t.navPrev.offset().left + t.navPrev.outerWidth()), t.navNext.css("display") == "block" ? t.navNextVisible = !0 : t.navPrev.css("display") == "block" ? t.navPrevVisible = !0 : (t.navNextVisible = !1, t.navPrevVisible = !1), n(".shell-category-nav-featured").length > 0 && (t.featuredMenu = n(".shell-category-nav-featured"), t.featuredMenuStart = t.featuredMenu.find(".c-nav-link"), t.navContainerWidth = t.navContainerWidth - t.featuredMenu.outerWidth(), r = it(t.featuredMenuStart) - it(t.featuredMenuStart.parent()), t.navContainerOuterWidth = t.navContainerOuterWidth - t.featuredMenuStart.outerWidth() - r, t.navNext.prependTo(t.featuredMenu), t.navNextVisible === !0 || t.navPrevVisible === !0 ? t.featuredMenu.addClass("force-" + t.scrollOppositeDirection) : t.featuredMenu.removeClass("force-" + t.scrollOppositeDirection), t.isRTL && (t.navContainerOffset = t.featuredMenuStart.outerWidth() + t.featuredMenuStart.offset().left)), t
            },
            saveState: function() {
                var n = t.navSlide;
                n.state = n.state || {};
                n.state = n.getState();
                n.disableLinks()
            },
            navScrollReset: function() {
                var n = t.navSlide;
                n.state.navNext.hide();
                n.state.navPrev.hide();
                n.state.cta.show();
                n.state.firstNav.css("margin-" + n.state.scrollDirection, "-5px");
                n.scrollComplete()
            },
            scrollComplete: function() {
                var n = t.navSlide;
                n.state.navNextVisible || n.state.navPrevVisible || n.state.nav.css({
                    "max-width": ""
                });
                n.state.firstNav.css("margin-" + n.state.scrollDirection) === "-5px" && n.state.navPrev.hide();
                n.saveState()
            },
            disableLinks: function() {
                var i = t.navSlide;
                i.state.navItems.each(function() {
                    var t = n(this).offset().left,
                        r = n(this).outerWidth() + t;
                    i.state.isRTL ? r > i.state.navPosPrevLeft && i.state.navPrevVisible || t < i.state.navPosLeft && i.state.navNextVisible ? n(this).addClass("c-top-nav-disabled") : n(this).removeClass("c-top-nav-disabled") : t < i.state.navPosLeft && i.state.navPrevVisible || r > i.state.navNextOffset && i.state.navNextVisible ? n(this).addClass("c-top-nav-disabled") : n(this).removeClass("c-top-nav-disabled");
                    n(this).on("click", function(t) {
                        i.state.navNextVisible && n(this).hasClass("c-top-nav-disabled") ? (t.stopImmediatePropagation(), t.preventDefault(), i.navScrollNext(), i.state.navNext.hide()) : i.state.navPrevVisible && n(this).hasClass("c-top-nav-disabled") && (t.stopImmediatePropagation(), t.preventDefault(), i.navScrollPrev(), i.state.navNext.show())
                    })
                })
            },
            navScrollNext: function() {
                var n = t.navSlide,
                    i;
                f();
                i = n.state.isRTL ? {
                    "margin-right": -n.state.endPoint
                } : {
                    "margin-left": -(n.state.endPoint - n.state.navContainerWidth)
                };
                n.state.firstNav.animate(i, n.scrollComplete);
                n.state.firstNav.addClass("scroll-next");
                n.state.navPrev.css(n.state.scrollDirection, n.state.logoWidth - d);
                n.state.firstNav.hasClass("scroll-next") ? n.state.navPrev.show() : n.state.navPrev.hide()
            },
            navScrollPrev: function() {
                var n = t.navSlide,
                    i;
                f();
                i = n.state.isRTL ? {
                    "margin-right": -5
                } : {
                    "margin-left": -5
                };
                n.state.firstNav.hasClass("scroll-next") && parseInt(n.state.firstNav.css("margin-" + n.state.scrollDirection)) < -5 && n.state.firstNav.animate(i, n.scrollComplete)
            },
            widthCheck: function() {
                var n = t.navSlide,
                    i;
                n.navScrollReset();
                i = function() {
                    n.state.navNext.show();
                    n.scrollComplete();
                    n.state.cta.hide();
                    f();
                    var t = n.state.wrapWidth + d;
                    n.state.nav.css({
                        "max-width": t + "px"
                    })
                };
                n.state.isRTL ? (n.state.lastNav.offset().left < n.state.navContainerOffset ? i() : n.navScrollReset(), n.state.cta.length && n.state.lastNav.offset().left < n.state.cta.offset().left + n.state.cta.outerWidth() && n.state.cta.hide()) : (n.state.lastNavPos > n.state.navContainerOuterWidth + n.state.navContainer.offset().left ? i() : n.navScrollReset(), n.state.cta.length && n.state.endPoint > n.state.cta.offset().left && n.state.cta.hide());
                t.state.mobile() && n.navScrollReset()
            },
            clickNext: function(n) {
                var i = t.navSlide;
                n.stopImmediatePropagation();
                i.navScrollNext();
                i.state.navNext.hide()
            },
            clickPrev: function(n) {
                var i = t.navSlide;
                n.stopImmediatePropagation();
                i.navScrollPrev();
                i.state.navNext.show()
            },
            initialize: function() {
                if (n(".shell-category-nav-wrapper").length > 0) {
                    var i = t.navSlide;
                    i.saveState();
                    i.state.navNext.on("click", function(n) {
                        i.clickNext(n)
                    });
                    i.state.navPrev.on("click", function(n) {
                        i.clickPrev(n)
                    });
                    i.state.navNext.on("keypress", function(n) {
                        n.keyCode === 32 && i.clickNext(n)
                    });
                    i.state.navPrev.on("keypress", function(n) {
                        n.keyCode === 32 && i.clickPrev(n)
                    });
                    n(window).resize(n.throttle(100, i.widthCheck));
                    i.widthCheck()
                }
            }
        }, t.init = t.init || function() {
            t.navSlide.initialize()
        }, {
        init: function() {
            wt();
            lt();
            rt();
            n(window).resize();
            t.init()
        }
    }
}(jQuery);
(function(n) {
    n(document).ready(function() {
        n(".shell-category-header").length && categoryHeader.init()
    })
})(jQuery),
    function(n) {
        function f(n) {
            for (var r = document.cookie.split("; "), i, u, t = 0; t < r.length; t++)
                if (i = r[t].split("="), u = o(i.shift()), u === n) return o(i.join("="));
            return null
        }

        function e(n, t, i) {
            var u, r;
            i ? (r = new Date, r.setTime(r.getTime() + i * 864e5), u = "; expires=" + r.toUTCString()) : u = "";
            window.document.cookie = n + "=" + t + u + "; path=/;"
        }

        function o(n) {
            var t = decodeURIComponent(n.replace("/+/g", " "));
            return t.indexOf('"') === 0 && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")), t
        }

        function c(n, t) {
            var i, r;
            t = t || {};
            i = "MECONTROLLOG:" + n + ",";
            for (r in t) i += r + "=" + t[r] + ",";
            console && console.log(i)
        }

        function l(t) {
            var r = t.elements[0];
            if (!n.trim(r.value).length) return r.focus(), !1;
            if (i && i.onSearch) i.onSearch(t);
            return !0
        }

        function a(t) {
            var u = n(".shell-category-header .current"),
                f = n(".shell-category-header .active"),
                i, r, e;
            u.length && u.removeClass("current");
            f.length && f.removeClass("active");
            i = n(document.getElementById(t));
            r = n(document.getElementById(t + "-mobile"));
            i.length && (i.addClass("current"), i.parent().parent().siblings(".c-top-nav-link").addClass("current"), r.length && (r.addClass("current"), r.parent().parent().siblings(".c-top-nav-link.c-nav-dropdown").addClass("current")), i.parents(".shell-header-dropdown-tab").find(".shell-header-dropdown-tab-label").addClass("current"), e = i.parents(".shell-header-dropdown"), e.find(".shell-header-dropdown-label").addClass("current"), i.data("show-cta") === !1 ? n("#shell-category-header-cta").hide() : n("#shell-category-header-cta").show())
        }

        function v(t) {
            for (var r = n("#shell-category-header-cta"), u = r.data("cta-targets"), i = 0; i < u.length; i++) u[i].Id === t && (r.text(u[i].Text), r.removeClass(r.attr("class").split(" ").pop()), r.addClass(u[i].ClassName), r.attr("href", u[i].Url), r.attr("data-id", u[i].Id), r.attr("data-bi-name", u[i].ElementName), r.attr("ms.title", u[i].Text))
        }

        function y() {
            var i = t,
                s, r, f, e, o;
            if (i) {
                s = '<div><div class="msame_Header"><a style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden; max-width: 160px; display: inline-block; border: 1px solid transparent; border-bottom-style: none;line-height: 50px; font-family: \'Segoe UI\'; font-size: 12px; color: rgb(80,80,80); padding: 0 10px;"><\/a><\/div><\/div>';
                r = i.rpData.preferredIdp === "msa" ? i.rpData.msaInfo : i.rpData.aadInfo;
                i.userData.authenticatedState == 1 ? (f = i.signOutStr || "Sign out", e = r.signOutUrl) : (f = i.signInStr || "Sign in", e = i.rpData.preferredIdp === "msa" ? r.signInUrl : r.signInUrlPlaceHolder);
                o = n(s);
                n(".msame_Header a", o).attr("href", e).text(f);
                n("#" + i.containerId).html(o);
                i.events.onEventLog("loadMeControl", {
                    type: "qos",
                    success: "0",
                    errorCode: "LoadFailed: Reverted to fallback",
                    duration: u
                })
            }
        }

        function s(i) {
            if (i && (i.extensibleLinks && t.extensibleLinks && (i.extensibleLinks.push.apply(i.extensibleLinks, t.extensibleLinks), t.extensibleLinks = null), t = n.extend(!0, {}, t, i)), t.enabled)
                if (window.MSA && window.MSA.MeControl) window.MSA.MeControl.Loader.load(t);
                else {
                    var r = setTimeout(function() {
                        y()
                    }, u);
                    window.onMeControlReadyToLoad = function() {
                        t.events.onEventLog("loadMeControl", {
                            type: "qos",
                            success: "1"
                        });
                        clearTimeout(r);
                        window.onMeControlReadyToLoad = null;
                        window.MSA.MeControl.Loader.load(t)
                    }
                }
        }

        function p(n) {
            var t = document.createElement("a");
            return t.href = n, t.href
        }

        function w(u) {
            u && (u.rpData.aadInfo && u.rpData.aadInfo.siteUrl && (u.rpData.aadInfo.siteUrl = p(u.rpData.aadInfo.siteUrl)), u.rpData.msaInfo && u.rpData.msaInfo.meUrl && (u.rpData.msaInfo.meUrl = u.rpData.msaInfo.meUrl + "&wreply=" + encodeURIComponent(window.location.protocol + "//" + window.location.host)), u.userData = {
                idp: window.msCommonShell.SupportedAuthIdp.MSA,
                firstName: null,
                lastName: null,
                memberName: null,
                cid: null,
                authenticatedState: window.msCommonShell.NotSignedIn
            }, u.events = {
                onEventLog: function(t, r) {
                    if (u.debug && c(t, r), t == "DropdownOpen" && n(".shell-header-dropdown:not(.horizontalLayout)").removeClass("active"), t === "HeaderReady" && n(".msame_Header").prop("tabIndex", "60"), i && i.onEventLog) i.onEventLog("MeControl_" + t, r)
                }
            }, r = !1, t = n.extend(!0, {}, u, t || {}))
        }

        function h(t) {
            var r, u;
            t != null && (t.events != null && (i = t.events), t.currentGlobalItemId != null && (r = document.getElementById(t.currentGlobalItemId), r && r.children.length && (r.firstElementChild.style["font-weight"] = "bold")), t.searchKeywordPreset && n("#cli_shellHeaderSearchInput").val(t.searchKeywordPreset), t.currentMenuItemId != null && a(t.currentMenuItemId), t.currentCtaId != null && v(t.currentCtaId), t.searchSuggestCallback != null && (u = window.msCommonShellSuggestion, u.initialize(t.searchSuggestCallback)))
        }

        function b(t) {
            var i, r;
            meControlInitOptions && w(meControlInitOptions);
            shellInitOptions && shellInitOptions.lcaDisclaimerEnabled && (i = n("#lca-cookie-notification"), f("msstore_hide_cn") !== "true" && i.addClass("shell-notification-active"), n("#lca-disclaimer-close").click(function() {
                e("msstore_hide_cn", "true", 365);
                i.removeClass("shell-notification-active");
                var t = document.getElementById("shell-header");
                n(".fixed-global-nav-buffer").height(t.offsetHeight)
            }));
            r = n("#shell-cart-count");
            r.length && r.attr("src", function() {
                return n(this).attr("data-src")
            });
            t != null ? (h(t), s(t.meControlOptions)) : s()
        }

        function k() {
            return r
        }
        var t = null,
            r = !1,
            u = 5e3,
            i = null;
        window.msCommonShell = {
            AuthState: {
                SignedIn: 1,
                SignedInIdp: 2,
                NotSignedIn: 3
            },
            SupportedAuthIdp: {
                MSA: "msa",
                AAD: "aad"
            },
            meControlOptions: function() {
                return t
            },
            isUserSignedIn: k,
            getCookie: f,
            setCookie: e,
            load: function(n) {
                b(n)
            },
            update: function(n) {
                h(n)
            },
            onSearch: function(n) {
                return l(n)
            }
        };
        n(window).on("message onmessage", function(t) {
            var i = t.originalEvent.data,
                u = n("#shell-cart-count").prop("src"),
                r, f;
            u && u.indexOf(t.originalEvent.origin) === 0 && i && (i = new String(i), r = i.split("="), r[0] === "DR_Cart_Count" && (f = r[1], n(".shopping-cart-amount").text(f)))
        });
        window.onShellReadyToLoad && window.onShellReadyToLoad()
    }(jQuery),
    function(n) {
        window.msCommonShellSuggestion = {
            initialize: function(t) {
                var i = n("#cli_shellHeaderSearchInput"),
                    r = n("#cli_searchSuggestionsResults"),
                    u = n("#cli_searchSuggestionsContainer"),
                    f = "";
                i.bind("input", function() {
                    var n = i.val();
                    n != f && t({
                        text: n,
                        response: window.msCommonShellSuggestion.displayResults
                    });
                    f = n
                });
                i.keydown(function(n) {
                    function i(n) {
                        t.removeClass("selected");
                        n.addClass("selected")
                    }
                    var t = r.find(".selected"),
                        u = t.length > 0;
                    switch (n.keyCode) {
                        case 38:
                            u ? i(t.prev()) : i(r.children().last());
                            n.preventDefault();
                            break;
                        case 40:
                            u ? i(t.next()) : i(r.children().first());
                            n.preventDefault();
                            break;
                        case 13:
                            u && (t.click(), n.preventDefault())
                    }
                });
                i.focus(function() {
                    r.children().length > 0 && u.addClass("visible")
                });
                i.blur(function() {
                    setTimeout(function() {
                        u.removeClass("visible")
                    }, 200)
                })
            },
            displayResults: function(t) {
                var o = this,
                    s = n("#cli_shellHeaderSearchInput"),
                    i = n("#cli_searchSuggestionsResults"),
                    r, u, f, e;
                o.text == s.val() && (i.empty(), n.each(t.suggestions, function(t, r) {
                    var u = n("<li>"),
                        f = n("<a>");
                    u.append(f);
                    r.image ? (f.append(n("<img>").attr("src", r.image)), u.attr("class", "sg_prod")) : u.attr("class", "sg_term");
                    f.append(r.title.replace(new RegExp(o.text, "ig"), "<strong>$&<\/strong>"));
                    f.attr({
                        "ms.title": r.title,
                        "ms.cmpnm": "suggested item",
                        "ms.cn": r.title,
                        href: r.target,
                        "data-bi-name": r.title,
                        "data-bi-source": "UnifiedSearch",
                        "data-bi-slot": t + 1
                    });
                    u.mouseover(function() {
                        i.children().removeClass("selected");
                        u.addClass("selected")
                    });
                    u.click(function() {
                        s.val(r.title);
                        r.target ? window.location.href = r.target : n("#srv_shellHeaderSearchForm").submit()
                    });
                    i.append(u)
                }));
                i.children().length > 0 ? (n("#cli_searchSuggestionsContainer").addClass("visible"), r = n(".sg_term"), u = n(".sg_prod"), r.length > 0 && r.last().addClass("last-sg-term"), u.length > 0 && (f = n(".cli_suggestedtitle"), e = n("<li class='cli_suggestedtitle'>" + shellInitOptions.suggestedProductTitle + "<\/li>"), f.length > 0 && f.remove(), e.addClass("sg-title"), u.first().before(e))) : n("#cli_searchSuggestionsContainer").removeClass("visible")
            }
        }
    }(jQuery)



